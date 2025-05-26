import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/store";
import { useProfileStore } from "./profile.store";
import { setTokenHelper } from "@/helpers/storage.helper";

/**
 * Interface defining the authentication store state and actions
 * This store manages authentication state across the application
 */
interface IAuthStore {
  /**
   * Flag indicating whether the user is currently authenticated
   */
  isAuthenticated: boolean;

  /**
   * Action to update the authentication status
   * @param isAuthenticated - The new authentication status
   */
  setIsAuthenticated: (isAuthenticated: boolean) => void;

  /**
   * Authentication token received from the backend
   * Used for authorizing API requests
   */
  token?: string;

  /**
   * Action to set the authentication token
   * @param token - The authentication token to store
   */
  setToken: (token: string) => void;

  /**
   * Action to log the user out
   * Resets this store and other related stores
   */
  logout: () => void;

  /**
   * Utility action to update multiple state properties at once
   * @param value - Object containing properties to update
   */
  updateState: (value: object) => void;

  /**
   * Action to reset the store to its initial state
   * Used during logout or for testing purposes
   */
  reset: () => void;
}

/**
 * Initial state for the authentication store
 * Default values when the user is not authenticated
 */
const initState = {
  isAuthenticated: false,
  token: undefined,
};

/**
 * Authentication store using Zustand with persistence
 *
 * This store:
 * 1. Manages user authentication state
 * 2. Persists data between app sessions using MMKV storage
 * 3. Provides actions for login, logout, and token management
 * 4. Coordinates with other stores during authentication changes
 */
export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      ...initState,

      /**
       * Updates the authentication status
       * @param isAuthenticated - Whether the user is authenticated
       */
      setIsAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },

      /**
       * Stores the authentication token
       * @param token - The JWT or other authentication token
       */
      setToken: (token: string) => {
        set({ token });
      },

      /**
       * Updates multiple state properties at once
       * Useful for updating several fields after login
       * @param value - Object with properties to merge into state
       */
      updateState: (value: object) => {
        set((state) => ({
          ...state,
          ...value,
        }));
      },

      /**
       * Performs a complete logout
       * 1. Resets this store to initial state
       * 2. Resets related stores (profile, etc.)
       * 3. Clears authentication token from storage
       */
      logout: () => {
        set(initState);

        // Reset other stores
        useProfileStore.getState().reset();

        // delete token in storage
        setTokenHelper("");
      },

      /**
       * Resets only this store to initial state
       * Used for testing or when a partial reset is needed
       */
      reset: () => {
        set(initState);
      },
    }),
    {
      /**
       * Storage configuration for persistence
       * Uses MMKV storage for high-performance persistence
       */
      name: "auth-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
