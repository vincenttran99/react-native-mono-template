import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { authApi, LoginResponse, LoginPayload } from "./auth.api";
import { useAuthStore } from "store/auth.store";
import { setTokenHelper } from "helpers/storage.helper";

/**
 * Constants for React Query key management
 * - PERSIST_KEY: Used for data that should be persisted in local storage
 * - INSTANCE_KEY: Used for data that should be cleared on logout
 */
export const RQKEY_ROOT = "login-auth";
export const loginAuthQueryKeys = {};

/**
 * A mock function that simulates the login process
 * Used for development and testing purposes when the real API is not available
 * 
 * @param payload - The login credentials (email and password)
 * @returns A Promise that resolves to a LoginResponse with mock tokens
 */
const fakeLoginProcess = (payload: LoginPayload) => {
  return new Promise<LoginResponse>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        access_token: "access_token",
        refresh_token: "refresh_token",
        expires_at: "2021-01-01",
      });
    }, 1000);
  });
};

/**
 * Custom hook for handling login authentication
 * Uses React Query's useMutation to manage the login API call and its states
 * 
 * @returns A mutation object with methods and states for the login process
 */
export const useLoginMutation = () => {
  const updateState = useAuthStore.getState().updateState;
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, AxiosError, LoginPayload>({
    /**
     * The function that will be called when the mutation is executed
     * Currently using the mock function (fakeLoginProcess) instead of the real API
     * Uncomment the line below to use the real API endpoint
     */
    // mutationFn: authApi.login,
    mutationFn: fakeLoginProcess,
    onSuccess: (data) => {
      /**
       * Updates the authentication state in the global store
       * Sets the token and authentication status to true
       * This will trigger UI updates across the app for authenticated components
       */
      updateState({
        token: data.access_token,
        isAuthenticated: true,
      });
      /**
       * Stores the access token in local storage
       * This token will be used by Axios interceptors for authenticated requests
       */
      setTokenHelper(data?.access_token);
      /**
       * Optional: Invalidate and refetch queries that depend on authentication
       * Uncomment the line below to refresh user profile data after login
       */
      // queryClient.invalidateQueries({ queryKey: profileQueryKeys.myProfile });
    },
  });
};

/**
 * Custom hook for handling user logout
 * Uses React Query's useMutation to manage the logout API call and its states
 * 
 * @returns A mutation object with methods and states for the logout process
 */
export const useLogoutMutation = () => {
  return useMutation<any, AxiosError>({
    mutationFn: authApi.logout,
    onSuccess: () => {
      /**
       * Clears the authentication state and removes tokens
       * This will trigger UI updates across the app for unauthenticated components
       * Also clears any cached data that should not persist after logout
       */
      useAuthStore.getState().logout();
      setTokenHelper("");
    },
  });
};
