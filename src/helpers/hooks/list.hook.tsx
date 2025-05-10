import React, { useCallback, useMemo, useRef, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { RefreshControl } from "react-native";
import { VS } from "constants/sizes.constant";
import debounce from "lodash.debounce";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

export const LOADING_ITEM = "__loading__";
export const ERROR_ITEM = "__error__";
export const LOAD_MORE_ERROR_ITEM = "__load_more_error__";

type UseInfiniteListProps = {
  params?: any;
  query: (
    category?: string
  ) => UseInfiniteQueryResult<InfiniteData<any, any>, AxiosError<any, any>>;
  keyAttribute: string;
  pathToData?: string;

  /**
   * If you have multiple types of items in the list
   * you should use this prop to specify the key
   * and set BList's getItemType too
   */
  itemTypeKey?: string;
};

type UseInfiniteListResult<T> = {
  items: T[];
  isEmpty: boolean;
  updateParamRequest: (newParam: any) => void;
  updateParamRequestDebounce: (newParam: any) => void;
  setParamRequest: (newParam: any) => void;
  setParamRequestDebounce: (newParam: any) => void;
  paramRequest: any;
  refreshControl: () => JSX.Element;
  onRefresh: () => void;
  onEndReached: () => void;

  data: InfiniteData<AxiosResponse<any, any>, AxiosError<any, any>> | undefined;
  isFetching: boolean;
  isFetched: boolean;
  isError: boolean;
  error: AxiosError<any, any> | null;
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<InfiniteData<any, any>, AxiosError<any, any>>
  >;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<any, any>, AxiosError<any, any>>
  >;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
};

export function useInfiniteList<T>({
  params: params,
  query,
  keyAttribute,
  pathToData,
  itemTypeKey = "type",
}: UseInfiniteListProps): UseInfiniteListResult<T> {
  const [paramRequest, setParamRequest] = useState(params);

  const {
    data,
    isFetching,
    isFetched,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = query(paramRequest);

  const isRefreshing = useRef<boolean>(false);
  const isEmpty = useMemo(
    () => !isFetching && !data?.pages[0].length,
    [data, isFetching]
  );

  const onRefresh = useCallback(async () => {
    if (isRefreshing.current) return;
    isRefreshing.current = true;
    try {
      await refetch();
    } catch (err) {
      console.log("Failed to refresh lists", { message: err });
    }
    isRefreshing.current = false;
  }, [refetch, isRefetching]);

  const onEndReached = useCallback(async () => {
    if (isFetching || !hasNextPage || isError) return;
    try {
      await fetchNextPage();
    } catch (err) {
      console.log("Failed to load more lists", { message: err });
    }
  }, [isFetching, hasNextPage, isError, fetchNextPage]);

  const items = useMemo(() => {
    let items: any[] = [];
    if (isFetched) {
      if (isEmpty) {
        if (isError) {
          items = items.concat([
            { [keyAttribute]: ERROR_ITEM, [itemTypeKey]: ERROR_ITEM },
          ]);
        }
      } else if (data) {
        for (const page of data.pages) {
          let pageData = page;
          if (pathToData) {
            const paths = pathToData.split(".");
            for (const path of paths) {
              pageData = pageData?.[path];
            }
          }
          items = items.concat(Array.isArray(pageData) ? pageData : []);
        }
        if (isError) {
          items = items.concat([
            {
              [keyAttribute]: LOAD_MORE_ERROR_ITEM,
              [itemTypeKey]: LOAD_MORE_ERROR_ITEM,
            },
          ]);
        }
      }
    } else if (isFetching) {
      items = items.concat([
        { [keyAttribute]: LOADING_ITEM, [itemTypeKey]: LOADING_ITEM },
      ]);
    }
    return items;
  }, [isFetched, isError, data, isFetching, pathToData]);

  function refreshControl() {
    return (
      <RefreshControl
        onRefresh={onRefresh}
        refreshing={isRefetching}
        progressViewOffset={VS._24}
      />
    );
  }

  const updateParamRequest = useCallback((newParam: any) => {
    setParamRequest((oldParam: any) => {
      if (
        !Array.isArray(oldParam) &&
        typeof oldParam === "object" &&
        oldParam !== null &&
        !Array.isArray(newParam) &&
        typeof newParam === "object" &&
        newParam !== null
      ) {
        return { ...oldParam, ...newParam };
      }
      return newParam;
    });
  }, []);

  const updateParamRequestDebounce = useMemo(() => {
    return debounce((newParam: any) => {
      setParamRequest((oldParam: any) => {
        if (
          !Array.isArray(oldParam) &&
          typeof oldParam === "object" &&
          oldParam !== null &&
          !Array.isArray(newParam) &&
          typeof newParam === "object" &&
          newParam !== null
        ) {
          return { ...oldParam, ...newParam };
        }
        return newParam;
      });
    }, 500);
  }, []);

  const setParamRequestDebounce = useMemo(() => {
    return debounce((newParam: any) => {
      setParamRequest(newParam);
    }, 500);
  }, []);

  return {
    updateParamRequest,
    updateParamRequestDebounce,
    setParamRequestDebounce,
    setParamRequest,
    refreshControl,
    onEndReached,
    onRefresh,
    items,
    isEmpty,
    data,
    isFetching,
    isFetched,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    paramRequest,
  };
}
