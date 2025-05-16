import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { authApi, LoginResponse, LoginPayload } from "./auth.api";
import { useAuthStore } from "store/auth.store";
import { setTokenHelper } from "helpers/storage.helper";

// use PERSIST_KEY if you want to keep data in local storage
// use INSTANCE_KEY if you want to clear cache and local storage (ex: clear when user logout)
export const RQKEY_ROOT = "login-auth";
export const loginAuthQueryKeys = {};

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

export const useLoginMutation = () => {
  const updateState = useAuthStore.getState().updateState;
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, AxiosError, LoginPayload>({
    /**
     * Call API here
     * @param data
     */
    // mutationFn: authApi.login,
    mutationFn: fakeLoginProcess,
    onSuccess: (data) => {
      /**
       * Update auth here for new user when login success
       * It will be used in other places and automatically refetch data
       */
      updateState({
        token: data.access_token,
        isAuthenticated: true,
      });
      /**
       * Save token to local storage here for Axios interceptor
       */
      setTokenHelper(data?.access_token);
      /**
       * You can invalidate queries here for new user's data
       */
      // queryClient.invalidateQueries({ queryKey: profileQueryKeys.myProfile });
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation<any, AxiosError>({
    mutationFn: authApi.logout,
    onSuccess: () => {
      /**
       * Clear cache and local storage here
       */
      useAuthStore.getState().logout();
      setTokenHelper("");
    },
  });
};
