import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
  PersistQueryClientProviderProps,
} from "@tanstack/react-query-persist-client";
import { useProfileStore } from "@/store/profile.store";
import axios from "axios";

/**
 * Key used for storing React Query cache in AsyncStorage
 * This is the identifier for retrieving and saving query data
 */
const STORAGE_KEY = "queryClient-storage";

/**
 * Constants for query key management
 * PERSIST_KEY: Used to mark queries that should be persisted across app restarts
 * INSTANCE_KEY: Used to mark queries that should be cleared on logout
 */
export const PERSIST_KEY = "persist-key";
export const INSTANCE_KEY = "instance-key";

/**
 * Utility function to check if an error is an unauthorized error (401 or 403)
 * Used to determine if a query should be retried or if the user should be logged out
 *
 * @param error - The error object to check
 * @returns Boolean indicating if the error is an unauthorized error
 */
const isUnauthorizedError = (error: unknown): boolean => {
  return (
    axios.isAxiosError(error) &&
    (error.response?.status === 401 || error.response?.status === 403)
  );
};

/**
 * Type definition for the persisted client state structure
 * This represents the shape of data stored in AsyncStorage
 */
type PersistedClient = {
  clientState: {
    queries: Array<{
      queryKey: readonly unknown[];
    }>;
    mutations: unknown[];
  };
};

/**
 * Creates and configures a new QueryClient instance with default options
 * This function centralizes the configuration for consistent query behavior
 *
 * @returns A configured QueryClient instance
 */
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

/**
 * Configuration for query dehydration/rehydration
 * Controls which queries should be persisted to storage
 * - Mutations are never persisted
 * - Only queries with INSTANCE_KEY in their queryKey are persisted
 */
const dehydrateOptions: PersistQueryClientProviderProps["persistOptions"]["dehydrateOptions"] =
  {
    shouldDehydrateMutation: (_: any) => false,
    shouldDehydrateQuery: (query) => {
      return query.queryKey.includes(INSTANCE_KEY);
    },
  };

/**
 * Global QueryClient instance shared across the application
 * Created once and reused to maintain consistent cache
 */
const globalQueryClient = createQueryClient();

/**
 * Component that tracks user authentication state changes
 * Clears specific queries and AsyncStorage data when user logs out
 *
 * @returns null - This is a utility component with no UI
 */
function UserIdTracker() {
  const userId = useProfileStore((state) => state.profile?.user_id);
  const prevUserIdRef = useRef<string | undefined>(userId);

  useEffect(() => {
    // Only run when logout is detected (userId changes from defined to undefined)
    if (prevUserIdRef.current !== undefined && userId === undefined) {
      clearInstanceQueries();
      removeInstanceDataFromStorage();
    }

    prevUserIdRef.current = userId;
  }, [userId]);

  return null;
}

/**
 * Main React Query provider component
 * Sets up the query client with persistence capabilities
 *
 * @param children - React components to be wrapped by the provider
 * @returns Provider component with configured persistence
 */
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

/**
 * Clears all queries marked with INSTANCE_KEY from the query cache
 * Called when user logs out to prevent stale data from persisting
 */
function clearInstanceQueries() {
  globalQueryClient.removeQueries({
    predicate: (q) =>
      Array.isArray(q.queryKey) && q.queryKey.includes(INSTANCE_KEY),
  });
}

/**
 * Removes instance-specific query data from AsyncStorage
 * Filters out queries with INSTANCE_KEY from the persisted cache
 * This ensures user-specific data doesn't persist after logout
 */
async function removeInstanceDataFromStorage() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const parsed: PersistedClient = JSON.parse(raw);

    const filteredQueries = parsed.clientState.queries.filter((q) => {
      // Only keep queries that don't have INSTANCE_KEY
      return !q.queryKey.includes(INSTANCE_KEY);
    });

    const updatedCache: PersistedClient = {
      ...parsed,
      clientState: {
        ...parsed.clientState,
        queries: filteredQueries,
      },
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCache));
  } catch (err) {
    console.error("Failed to clean persisted user queries:", err);
  }
}
