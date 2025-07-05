import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import {
  hideGlobalLoading,
  showErrorMessage,
  showGlobalLoading,
  showSuccessMessage,
} from "./global.helper";

// Utility types to extract types from functions (generic for all async functions)
type ExtractParams<T> = T extends (params: infer P) => any ? P : never;
type ExtractReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;

/**
 * Interface defining the configuration options for API request handling
 * Works with any async function, not just Axios
 *
 * @template TRequestFn - The type of the async request function
 */
export type ApiRequestOptions<
  TRequestFn extends (...args: any[]) => Promise<any>
> = {
  /**
   * The async request function to execute
   * Can be any function that returns a Promise
   */
  request: TRequestFn;

  /**
   * Parameters to pass to the request function
   * Type is automatically inferred from the request function
   */
  params?: ExtractParams<TRequestFn>;

  /**
   * Message to display on successful request completion
   */
  successedMessage?: string;

  /**
   * Whether to show error messages automatically
   * Default: true
   */
  showMessageFailed?: boolean;

  /**
   * Callback function to execute on successful request completion
   * Receives the response with correct type
   */
  onSuccess?: (response: ExtractReturnType<TRequestFn>) => void;

  /**
   * Whether to show a loading indicator during the request
   * Default: true
   */
  showLoading?: boolean;

  /**
   * Whether to automatically hide the loading indicator after request success
   * Default: true
   */
  autoHideLoadingOnSuccess?: boolean;

  /**
   * Custom error message to display on request failure
   * If not provided, the error message from the API response will be used
   */
  failedMessage?: string;

  /**
   * Callback function to execute on request failure
   * Receives the error object
   */
  onFailed?: (error: any) => void;
};

/**
 * Utility function to handle API requests with standardized loading, success, and error handling
 *
 * This function provides a consistent pattern for API requests including:
 * - Showing/hiding loading indicators
 * - Displaying success/error messages
 * - Executing success/failure callbacks
 * - Error handling with fallback messages
 *
 * @template T - The expected response data type
 * @param options - Configuration options for the request
 * @returns Promise<void>
 *
 * @example
 * // Basic usage
 * await handleApiRequestHelper({
 *   request: api.getUserProfile,
 *   params: { userId: 123 },
 *   successedMessage: 'Profile loaded successfully',
 *   onSuccess: (response) => setUserData(response.data)
 * });
 */
export async function handleApiRequestHelper<
  TRequestFn extends (...args: any[]) => Promise<any>
>({
  request: apiRequestFunction,
  params,
  successedMessage = "",
  showMessageFailed = true,
  onSuccess = undefined,
  showLoading = true,
  autoHideLoadingOnSuccess = true,
  onFailed,
  failedMessage = "",
}: ApiRequestOptions<TRequestFn>) {
  try {
    // Show loading indicator if requested
    if (showLoading) {
      showGlobalLoading();
    }

    // Execute the API request with provided parameters
    const response = await apiRequestFunction?.(params);

    // Handle successful response
    if (response) {
      // Execute success callback if provided
      if (onSuccess) {
        onSuccess?.(response);
      }

      // Show success message if provided
      if (successedMessage) {
        showSuccessMessage(successedMessage);
      }

      // Hide loading indicator if auto-hide is enabled
      if (autoHideLoadingOnSuccess) {
        hideGlobalLoading();
      }
      return;
    }

    // If we reach here, the request completed but returned no response
    // This is considered a network error
    onFailed?.(i18n._(msg`Network Error`));
  } catch (error: any) {
    // Always hide loading indicator on error
    hideGlobalLoading();

    // Extract error message from response (flexible for different response formats)
    let errorMessage;

    // Try to extract error from Axios-style response
    if (error?.response?.data?.message) {
      const errorMessages = error.response.data.message;
      errorMessage = Array.isArray(errorMessages)
        ? errorMessages[0]
        : errorMessages;
    }
    // Try to extract from direct error message
    else if (error?.message) {
      errorMessage = error.message;
    }
    // Fallback to generic error
    else {
      errorMessage = i18n._(msg`Something went wrong`);
    }

    // Show error message if enabled
    if (showMessageFailed) {
      showErrorMessage(failedMessage || errorMessage);
    }

    // Execute error callback if provided
    onFailed?.(error);
  }
}
