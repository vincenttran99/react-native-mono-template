import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
  PersistQueryClientProviderProps,
} from "@tanstack/react-query-persist-client";
import { useProfileStore } from "store/profile.store";
import axios from "axios";

const STORAGE_KEY = "queryClient-storage";

// key allow to persist query data
export const PERSIST_KEY = "persist-key";
// key mark instance query data
export const INSTANCE_KEY = "instance-key";

// Check 401, 403 codes
const isUnauthorizedError = (error: unknown): boolean => {
  return (
    axios.isAxiosError(error) &&
    (error.response?.status === 401 || error.response?.status === 403)
  );
};

type PersistedClient = {
  clientState: {
    queries: Array<{
      queryKey: readonly unknown[];
    }>;
    mutations: unknown[];
  };
};

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // NOTE
        // refetchOnWindowFocus breaks some UIs (like feeds)
        // so we only selectively want to enable this
        // -prf
        refetchOnWindowFocus: false,
        // Structural sharing between responses makes it impossible to rely on
        // "first seen" timestamps on objects to determine if they're fresh.
        // Disable this optimization so that we can rely on "first seen" timestamps.
        structuralSharing: false,
        // We don't want to retry queries by default, because in most cases we
        // want to fail early and show a response to the user. There are
        // exceptions, and those can be made on a per-query basis. For others, we
        // should give users controls to retry.
        retry: false,
        // If you want to retry a query after a 401, 403, or other error, you can
        // do so here.
        // retry: (failureCount, error) => {
        //   if (isUnauthorizedError(error)) {
        //     return false; // Do not retry with 401, 403 error
        //   }
        //   return failureCount < 3; // Default retry up to 3 times for other errors
        // },
      },
    },
  });

const dehydrateOptions: PersistQueryClientProviderProps["persistOptions"]["dehydrateOptions"] =
  {
    shouldDehydrateMutation: (_: any) => false,
    shouldDehydrateQuery: (query) => {
      return query.queryKey.includes(INSTANCE_KEY);
    },
  };

const globalQueryClient = createQueryClient();

function UserIdTracker() {
  const userId = useProfileStore((state) => state.profile?.user_id);
  const prevUserIdRef = useRef<string | undefined>(userId);

  useEffect(() => {
    //only run when logout
    if (prevUserIdRef.current !== undefined && userId === undefined) {
      clearSpecificQueries();
      removeDataFromAsyncStorage();
    }

    prevUserIdRef.current = userId;
  }, [userId]);

  return null;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [persistOptions, _setPersistOptions] = useState(() => {
    const asyncPersister = createAsyncStoragePersister({
      storage: AsyncStorage,
      key: STORAGE_KEY,
    });
    return {
      persister: asyncPersister,
      dehydrateOptions,
    };
  });

  return (
    <PersistQueryClientProvider
      client={globalQueryClient}
      persistOptions={persistOptions}
    >
      <UserIdTracker />
      {children}
    </PersistQueryClientProvider>
  );
}

function clearSpecificQueries() {
  globalQueryClient.removeQueries({
    predicate: (q) =>
      Array.isArray(q.queryKey) && q.queryKey.includes(INSTANCE_KEY),
  });
}

// Function to remove old data from AsyncStorage
async function removeDataFromAsyncStorage() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const parsed: PersistedClient = JSON.parse(raw);

    const filtered = parsed.clientState.queries.filter((q) => {
      // only keep if not an instance key
      return !q.queryKey.includes(INSTANCE_KEY);
    });

    const newBlob: PersistedClient = {
      ...parsed,
      clientState: {
        ...parsed.clientState,
        queries: filtered,
      },
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newBlob));
  } catch (err) {
    console.error("cleanPersistedUserQueries failed:", err);
  }
}
