import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { CONFIG } from "@/constants/config.constant";
import { removeEmptyFieldsHelper } from "@/helpers/object.helper";

/**
 * Console color codes for formatting log output
 * These ANSI escape codes are used to add colors to console logs in development mode
 */
let Reset = "\x1b[0m"; // Resets all formatting
let Bright = "\x1b[1m"; // Makes text bold/bright
let FgGreen = "\x1b[32m"; // Sets text color to green
let BgGreen = "\x1b[42m"; // Sets background color to green
let BgBlue = "\x1b[44m"; // Sets background color to blue
let BgMagenta = "\x1b[45m"; // Sets background color to magenta

/**
 * API configuration constants
 * Timeout value is retrieved from CONFIG and converted to a number
 */
const TIMEOUT = Number(CONFIG.REQUEST_TIMEOUT);

/**
 * Create an Axios instance with default configuration
 * This instance will be used for all API requests in the application
 */
const api = axios.create({
  baseURL: CONFIG.API_URL, // Base URL for all requests
  timeout: TIMEOUT, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json", // Default content type for requests
    Accept: "application/json", // Default accepted response format
  },
});

/**
 * Request interceptor success handler
 * Modifies the request configuration before it is sent
 *
 * @param axiosConfig - The Axios request configuration object
 * @returns The modified request configuration
 */
const onRequestSuccess = async (axiosConfig: any) => {
  // You can modify the request config here or setup automated headers
  // Example: axiosConfig.headers.Authorization = `Bearer ${getTokenHelper()}`;

  /**
   * Add cache buster to prevent caching
   * Appends a random number to the URL to ensure each request is unique
   * This forces the server to return fresh data instead of cached responses
   */
  const cacheBuster = Math.round(Math.random() * 1000000);
  axiosConfig.url =
    axiosConfig.url +
    (axiosConfig?.url?.includes("cacheBuster=")
      ? ""
      : (axiosConfig.url?.includes("?") ? "&" : "?") +
        `cacheBuster=${cacheBuster}`);

  /**
   * Log request details in development mode
   * Provides colorful console output with request method, URL, body, and auth header
   */
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
 * Response interceptor success handler
 * Processes successful responses before they are passed to the calling code
 *
 * @param response - The Axios response object
 * @returns The processed response
 */
const onResponseSuccess = async (response: AxiosResponse<any, any>) => {
  /**
   * Log response details in development mode
   * Provides console output with request method, URL, and full response object
   */
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
 * Response interceptor error handler
 * Processes error responses before they are passed to the calling code
 *
 * @param err - The error object from Axios
 * @returns A rejected promise with the error
 */
const onResponseError = async (err: any) => {
  /**
   * Log error details in development mode
   * Provides console output with the full error object
   */
  if (__DEV__) {
    console.log("Response Error", err);
  }
  return Promise.reject(err);
};

/**
 * Clear any existing interceptors to prevent duplicates
 * This ensures we don't have multiple interceptors if the module is imported multiple times
 */
api.interceptors.request.clear();
api.interceptors.response.clear();

/**
 * Register the interceptors with the Axios instance
 * These will process all requests and responses
 */
api.interceptors.request.use(onRequestSuccess);
api.interceptors.response.use(onResponseSuccess, onResponseError);

/**
 * API service object
 * Provides wrapper methods for common HTTP operations
 * Each method returns a Promise that resolves to the response data
 */
export const apiService = {
  /**
   * Perform a GET request
   *
   * @param url - The endpoint URL (will be appended to baseURL)
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.get<T>(url, config);
    return response.data;
  },

  /**
   * Perform a POST request
   * Automatically removes empty fields from the request data
   *
   * @param url - The endpoint URL (will be appended to baseURL)
   * @param data - The request body data
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
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

  /**
   * Perform a PUT request
   * Automatically removes empty fields from the request data
   *
   * @param url - The endpoint URL (will be appended to baseURL)
   * @param data - The request body data
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
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

  /**
   * Perform a PATCH request
   * Automatically removes empty fields from the request data
   *
   * @param url - The endpoint URL (will be appended to baseURL)
   * @param data - The request body data
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
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

  /**
   * Perform a DELETE request
   *
   * @param url - The endpoint URL (will be appended to baseURL)
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.delete<T>(url, config);
    return response.data;
  },
};

/**
 * Export the Axios instance as default
 * This allows direct access to the configured Axios instance if needed
 */
export default api;
