import { useEffect } from "react";

/**
 * Custom hook to execute an asynchronous function and handle the results when the component is mounted.
 * This hook prevents memory leaks by canceling actions if the component is unmounted before the async operation completes.
 *
 * @param asyncFn - The asynchronous function to be executed.
 * @param arrayCallbackFunction - An array of callback functions to handle the results of the asynchronous function.
 */
export function useAsync<T>(
  asyncFn: () => Promise<T[]>,
  arrayCallbackFunction: ((item: T) => void)[]
) {
  useEffect(() => {
    let isActive = true;

    try {
      asyncFn()
        .then((data: T[]) => {
          if (isActive) {
            data.forEach((itemResult, index) => {
              if (
                itemResult &&
                typeof arrayCallbackFunction[index] === "function"
              )
                arrayCallbackFunction[index](itemResult);
            });
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }

    return () => {
      isActive = false;
    };
  }, [asyncFn]);
}
