import { AxiosResponse } from "axios";
import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import {
  hideGlobalLoading,
  showErrorMessage,
  showGlobalLoading,
  showSuccessMessage,
} from "./global.helper";

/**
 * Interface defining the configuration options for API request handling
 * Provides a standardized way to handle common API request patterns
 *
 * @template T - The expected response data type
 */
export type ApiRequestOptions<T> = {
  /**
   * Parameters to pass to the request function
   */
  params?: any;

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
   * Receives the full Axios response object
   */
  onSuccess?: (response: AxiosResponse<T, any>) => void;

  /**
   * Whether to show a loading indicator during the request
   * Default: true
   */
  showLoading?: boolean;

  /**
   * Whether to automatically hide the loading indicator after request completion
   * Default: true
   */
  autoHideLoading?: boolean;

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

  /**
   * The API request function to execute
   * Should return a Promise resolving to an Axios response
   */
  request?: Function;
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
export async function handleApiRequestHelper<T>({
  request: apiRequestFunction,
  params,
  successedMessage = "",
  showMessageFailed = true,
  onSuccess = undefined,
  showLoading = true,
  autoHideLoading = true,
  onFailed,
  failedMessage = "",
}: ApiRequestOptions<T>) {
  try {
    // Show loading indicator if requested
    if (showLoading) {
      showGlobalLoading();
    }

    // Execute the API request with provided parameters
    const response = await apiRequestFunction?.(params);

    // Hide loading indicator if auto-hide is enabled
    if (autoHideLoading) {
      hideGlobalLoading();
    }

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
      return;
    }

    // If we reach here, the request completed but returned no response
    // This is considered a network error
    onFailed?.(i18n._(msg`Network Error`));
  } catch (error: any) {
    // Always hide loading indicator on error
    hideGlobalLoading();

    // Extract error message from response
    const errorMessages = error?.response?.data?.message;

    // Handle array of error messages or single message
    // Fall back to generic error message if none provided
    const errorMessage = Array.isArray(errorMessages)
      ? errorMessages?.[0]
      : errorMessages || i18n._(msg`Something went wrong`);

    // Show error message if enabled
    if (showMessageFailed) {
      showErrorMessage(failedMessage || errorMessage);
    }

    // Execute error callback if provided
    onFailed?.(error);
  }
}
