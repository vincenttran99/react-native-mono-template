import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { AxiosError } from "axios";
import { INSTANCE_KEY, PERSIST_KEY } from "api/reactQuery";
import { dogApi, GetDogsParams } from "./dog.api";
import { IDog } from "models/dog.model";

// use PERSIST_KEY if you want to keep data in local storage
// use INSTANCE_KEY if you want to clear cache and local storage (ex: clear when user logout)
export const RQKEY_ROOT = "dog";
export const notificationQueryKeys = {
  list: [PERSIST_KEY, INSTANCE_KEY, RQKEY_ROOT, "list"] as const,
};

export const useDogListQuery = () => {
  return useInfiniteQuery<
    IDog[],
    AxiosError,
    InfiniteData<IDog[]>,
    QueryKey,
    GetDogsParams
  >({
    queryKey: notificationQueryKeys.list,
    queryFn: (value) => {
      return dogApi.getDogs(value.pageParam);
    },
    initialPageParam: {
      page: 0,
      limit: 20,
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage?.length === lastPageParam?.limit
        ? {
            ...lastPageParam,
            page: lastPageParam?.page ? lastPageParam.page + 1 : 1,
          }
        : undefined;
    },
    staleTime: 1000 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
