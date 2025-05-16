import React from "react";
import { unstable_batchedUpdates } from "react-native";

/**
 * Store the original React.useState implementation
 * This allows us to restore or access the original behavior when needed
 */
const originalUseState = React.useState;

/**
 * Factory function that creates a custom useState hook with batched updates
 * Batching multiple state updates improves performance by reducing re-renders
 * 
 * @param batchingFunction - A function that schedules when batched updates should be processed
 *                          (e.g., setTimeout, requestAnimationFrame, or immediate execution)
 * @returns A custom useState hook with batched update behavior
 */
export function createBatchedStateHook(
  batchingFunction: (fn: () => void) => void
) {
  const useState = originalUseState;
  
  /**
   * Queue to store pending state updates
   * All state updates are collected here before being processed in a batch
   */
  let updateQueue: (() => void)[] = [];
  
  /**
   * Flag to track if a batch update is already scheduled
   * Prevents scheduling multiple batch updates simultaneously
   */
  let updateInProgress = false;

  /**
   * Custom useState hook with batched update behavior
   * 
   * @template T - Type of the state value
   * @param initialValue - Initial state value or function that returns the initial state
   * @returns A tuple containing the current state and a batched setState function
   */
  return <T>(initialValue: T | (() => T)) => {
    const [state, setState] = useState(initialValue);

    /**
     * Batched version of setState that collects updates and processes them together
     * This function is stable across renders (via useCallback) to prevent unnecessary re-renders
     * 
     * @param value - New state value or function to update the previous state
     */
    const batchedSetState: typeof setState = React.useCallback((value) => {
      // Add the state update function to the queue
      updateQueue.push(() => {
        setState(value);
      });

      // If no batch update is in progress, schedule one
      if (!updateInProgress) {
        updateInProgress = true;

        // Use the provided batching function to schedule the update
        batchingFunction(() => {
          // Capture the current queue and reset it for future updates
          const pendingUpdates = updateQueue;
          updateQueue = [];
          
          // Process all queued updates in a single batch using React's batching API
          unstable_batchedUpdates(() => {
            pendingUpdates.forEach((update) => update());
            updateInProgress = false;
          });
        });
      }
    }, []);

    return [state, batchedSetState] as const;
  };
}

/**
 * A drop-in replacement for React's useState that batches state updates
 * Uses setTimeout to schedule batched updates, which defers them to the next event loop tick
 * 
 * Batching can significantly improve performance when multiple state updates are required in rapid succession.
 * Please note the setState returned by this hook is stable but may still trigger exhaustive deps warnings.
 * You can add it to the deps array to silence the warning.
 * 
 * @example
 * // Instead of:
 * const [count, setCount] = React.useState(0);
 * 
 * // Use:
 * const [count, setCount] = useBatchedState(0);
 */
export const useBatchedState = createBatchedStateHook(setTimeout);

/**
 * Exposes the default React.useState implementation
 * Useful when batched state updates are enabled globally but you need the original behavior
 * 
 * @example
 * // When React.useState has been replaced globally:
 * const [state, setState] = useStateSync(initialValue); // Uses original non-batched behavior
 */
export const useStateSync = originalUseState;

/**
 * Globally replaces React.useState with the batched version
 * This affects all components in the application that use useState
 * 
 * WARNING: Use with caution as this modifies React's core behavior
 * 
 * @example
 * // In your app's entry point:
 * enableBatchedStateUpdates();
 * // Now all useState calls in your app will use batched updates
 */
export function enableBatchedStateUpdates() {
  Object.assign(React, { useState: useBatchedState });
}
