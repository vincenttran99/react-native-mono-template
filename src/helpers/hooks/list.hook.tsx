import React, { useCallback, useMemo, useRef, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { RefreshControl } from "react-native";
import { VS } from "@/constants/sizes.constant";
import debounce from "lodash.debounce";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

/**
 * Constants used to identify special item types in the list
 * These are used to render loading states, errors, and load more errors
 */
export const LOADING_ITEM = "__loading__";
export const ERROR_ITEM = "__error__";
export const LOAD_MORE_ERROR_ITEM = "__load_more_error__";

/**
 * Props for the useInfiniteList hook
 * @typedef {Object} UseInfiniteListProps
 * @property {any} [params] - Initial parameters for the query
 * @property {Function} query - Function that returns a React Query useInfiniteQuery result
 * @property {string} keyAttribute - The key attribute to use for list item identification
 * @property {string} [pathToData] - Dot-notation path to access data in the response (e.g., "data.items")
 * @property {string} [itemTypeKey="type"] - Key used to identify item types for rendering different components
 */
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

/**
 * Return type for the useInfiniteList hook
 * Includes all data and functions needed to implement an infinite scrolling list
 *
 * @typedef {Object} UseInfiniteListResult
 * @template T - The type of items in the list
 */
type UseInfiniteListResult<T> = {
  listItems: T[];
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

/**
 * A custom hook that implements infinite scrolling list functionality with React Query
 * Handles data fetching, pagination, refresh, error states, and parameter updates
 *
 * @template T - The type of items in the list
 * @param {UseInfiniteListProps} props - Configuration options for the infinite list
 * @returns {UseInfiniteListResult<T>} - All data and functions needed to implement an infinite scrolling list
 *
 * @example
 * const {
 *   items,
 *   refreshControl,
 *   onEndReached,
 *   isEmpty,
 *   isError
 * } = useInfiniteList({
 *   query: () => useProductsQuery(queryParams),
 *   keyAttribute: 'id',
 *   pathToData: 'data.products'
 * });
 */
export function useInfiniteList<T>({
  params: params,
  query,
  keyAttribute,
  pathToData,
  itemTypeKey = "type",
}: UseInfiniteListProps): UseInfiniteListResult<T> {
  // State to store and update request parameters
  const [paramRequest, setParamRequest] = useState(params);

  // Execute the query with current parameters
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

  // Track if a refresh operation is in progress to prevent multiple simultaneous refreshes
  const isRefreshing = useRef<boolean>(false);

  // Determine if the list is empty (not loading and no data)
  const isEmpty = useMemo(
    () => !isFetching && !data?.pages[0].length,
    [data, isFetching]
  );

  /**
   * Handles pull-to-refresh functionality
   * Sets a flag to prevent multiple simultaneous refreshes
   */
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

  /**
   * Handles loading more data when the user reaches the end of the list
   * Only fetches if not already fetching, has more pages, and no errors
   */
  const onEndReached = useCallback(async () => {
    if (isFetching || !hasNextPage || isError) return;
    try {
      await fetchNextPage();
    } catch (err) {
      console.log("Failed to load more lists", { message: err });
    }
  }, [isFetching, hasNextPage, isError, fetchNextPage]);

  /**
   * Processes the query data into a flat array of items
   * Handles special cases like loading, errors, and empty states
   * Navigates through nested response data using pathToData if provided
   */
  const listItems = useMemo(() => {
    let items: any[] = [];
    if (isFetched) {
      if (isEmpty) {
        if (isError) {
          // Add error item if the list is empty due to an error
          items = items.concat([
            { [keyAttribute]: ERROR_ITEM, [itemTypeKey]: ERROR_ITEM },
          ]);
        }
      } else if (data) {
        // Process each page of data
        for (const page of data.pages) {
          let pageData = page;
          // Navigate through nested response structure if pathToData is provided
          if (pathToData) {
            const paths = pathToData.split(".");
            for (const path of paths) {
              pageData = pageData?.[path];
            }
          }
          // Add page data to items array, ensuring it's an array
          items = items.concat(Array.isArray(pageData) ? pageData : []);
        }
        if (isError) {
          // Add load more error item if there was an error loading more data
          items = items.concat([
            {
              [keyAttribute]: LOAD_MORE_ERROR_ITEM,
              [itemTypeKey]: LOAD_MORE_ERROR_ITEM,
            },
          ]);
        }
      }
    } else if (isFetching) {
      // Add loading item if data is being fetched
      items = items.concat([
        { [keyAttribute]: LOADING_ITEM, [itemTypeKey]: LOADING_ITEM },
      ]);
    }
    return items;
  }, [
    isFetched,
    isError,
    data,
    isFetching,
    pathToData,
    isEmpty,
    keyAttribute,
    itemTypeKey,
  ]);

  /**
   * Creates a RefreshControl component for pull-to-refresh functionality
   * @returns {JSX.Element} RefreshControl component
   */
  function refreshControl() {
    return (
      <RefreshControl
        onRefresh={onRefresh}
        refreshing={isRefetching}
        progressViewOffset={VS._24}
      />
    );
  }

  /**
   * Updates request parameters by merging new parameters with existing ones
   * Handles both object and non-object parameters
   *
   * @param {any} newParam - New parameters to merge with existing ones
   */
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

  /**
   * Debounced version of updateParamRequest
   * Waits 500ms before applying parameter updates to prevent excessive API calls
   */
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

  /**
   * Debounced version of setParamRequest
   * Waits 500ms before replacing parameters to prevent excessive API calls
   */
  const setParamRequestDebounce = useMemo(() => {
    return debounce((newParam: any) => {
      setParamRequest(newParam);
    }, 500);
  }, []);

  // Return all data and functions needed to implement an infinite scrolling list
  return {
    updateParamRequest,
    updateParamRequestDebounce,
    setParamRequestDebounce,
    setParamRequest,
    refreshControl,
    onEndReached,
    onRefresh,
    listItems,
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
