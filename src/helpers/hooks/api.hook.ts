import { useEffect } from "react";

/**
 * Custom hook to execute an asynchronous function and process its results when the component mounts.
 * This hook safely handles component unmounting to prevent memory leaks and state updates on unmounted components.
 *
 * @template T - The type of data returned by the asynchronous function and processed by callbacks
 * @param asyncOperation - The asynchronous function that returns a Promise resolving to an array of type T
 * @param resultHandlers - An array of callback functions, each processing one item from the result array
 * 
 * @example
 * // Example usage with multiple API calls
 * useAsyncOperation(
 *   () => Promise.all([fetchUserProfile(), fetchUserSettings()]),
 *   [
 *     (profile) => setUserProfile(profile),
 *     (settings) => setUserSettings(settings)
 *   ]
 * );
 */
export function useAsyncOperation<T>(
  asyncOperation: () => Promise<T[]>,
  resultHandlers: ((item: T) => void)[]
) {
  useEffect(() => {
    // Flag to track if the component is still mounted
    let isComponentMounted = true;

    try {
      // Execute the async operation
      asyncOperation()
        .then((results: T[]) => {
          // Only process results if the component is still mounted
          if (isComponentMounted) {
            // Process each result with its corresponding handler function
            results.forEach((result, index) => {
              // Ensure the result exists and a valid handler function is available
              if (
                result &&
                typeof resultHandlers[index] === "function"
              ) {
                // Call the handler with the result
                resultHandlers[index](result);
              }
            });
          }
        })
        .catch((error) => {
          // Log any errors that occur during the async operation
          console.error("Async operation failed:", error);
        });
    } catch (error) {
      // Catch and log any synchronous errors that might occur
      console.error("Error setting up async operation:", error);
    }

    // Cleanup function to prevent updates if the component unmounts
    return () => {
      isComponentMounted = false;
    };
  }, [asyncOperation]); // Re-run effect if the async function reference changes
}
