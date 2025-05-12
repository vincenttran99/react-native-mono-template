import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { CONFIG } from "constants/config.constant";
import { MMKVStorage } from "helpers/storage.helper";
import { useAuthStore } from "store/auth.store";
import { authApi } from "./auth/auth.api";
import { showErrorMessage } from "helpers/globalHelper";
import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { removeEmptyFieldsHelper } from "helpers/object.helper";
import { createLogsFromResponseHelper } from "helpers/axios.helper";

let Reset = "\x1b[0m";
let Bright = "\x1b[1m";
let FgGreen = "\x1b[32m";
let BgGreen = "\x1b[42m";
let BgBlue = "\x1b[44m";
let BgMagenta = "\x1b[45m";

const TIMEOUT = Number(CONFIG.REQUEST_TIMEOUT);
const api = axios.create({
  baseURL: CONFIG.API_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * onRequestSuccess
 * @param axiosConfig
 */
const onRequestSuccess = async (axiosConfig: any) => {
  axiosConfig.headers["X-Authorization"] = MMKVStorage.getString("token");

  // Append cache buster to URL
  const cacheBuster = Math.round(Math.random() * 1000000);
  axiosConfig.url =
    axiosConfig.url +
    (axiosConfig?.url?.includes("cacheBuster=")
      ? ""
      : (axiosConfig.url?.includes("?") ? "&" : "?") +
        `cacheBuster=${cacheBuster}`);

  // Log request details
  let Method = String(axiosConfig.method).toUpperCase();
  if (__DEV__) {
    /**
     * Make color: https://backbencher.dev/articles/nodejs-colored-text-console
     */
    console.info(
      "==========<<<<<<<<<<<<<<<START AXIOS<<<<======================"
    );
    console.log(
      Bright + BgBlue + ` ${Method} ` + Reset,
      FgGreen + axiosConfig.url + Reset
    );
    console.log(
      Bright + BgMagenta + ` BODY ` + Reset,
      FgGreen + JSON.stringify(axiosConfig.body, null, 4) + Reset
    );
    console.log(
      Bright + BgGreen + ` AUTH ` + Reset,
      FgGreen + axiosConfig.headers["X-Authorization"] + Reset
    );
  }

  return axiosConfig;
};

/**
 * onResponseSuccess
 * @param response
 */
const onResponseSuccess = async (response: AxiosResponse<any, any>) => {
  createLogsFromResponseHelper(response, false);

  // Log response details
  let Method = String(response.config.method).toUpperCase();
  if (__DEV__) {
    console.log(
      Bright + BgBlue + ` ${Method} ` + Reset,
      FgGreen + response.config.url + Reset
    );
    console.log("Response Success", response);
  }

  return response;
};

/**
 * onResponseError
 * @param err
 */
const onResponseError = async (err: any) => {
  createLogsFromResponseHelper(err, true);
  // set session
  const session = err?.response?.headers["x-authorization"];
  if (session) MMKVStorage.set("session", session);

  /**
   * 401 or 403: not auth or permission
   */
  const status = err.status || (err.response ? err?.response?.status : 0);
  const requestUrl = err?.request?._url || "";
  if (
    (status === 401 || status === 403) &&
    requestUrl.toLowerCase().includes(CONFIG.API_URL?.toLowerCase())
  ) {
    try {
      showErrorMessage(i18n._(msg`Phiên đăng nhập đã hết hạn`));
      useAuthStore.getState().logout();
      authApi.logout();
    } catch (e) {
      console.log("Logout error", e);
    }
  }

  return Promise.reject(err);
};

api.interceptors.request.clear();
api.interceptors.response.clear();

api.interceptors.request.use(onRequestSuccess);
api.interceptors.response.use(onResponseSuccess, onResponseError);

export const apiService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.get<T>(url, config);
    return response.data;
  },

  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await api.post<T>(
      url,
      removeEmptyFieldsHelper(data),
      config
    );
    return response.data;
  },

  put: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await api.put<T>(
      url,
      removeEmptyFieldsHelper(data),
      config
    );
    return response.data;
  },

  patch: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await api.patch<T>(
      url,
      removeEmptyFieldsHelper(data),
      config
    );
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.delete<T>(url, config);
    return response.data;
  },
};

export default api;
