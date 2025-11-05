/**
 * This file configures persistent storage for Zustand state management
 * using MMKV, a highly efficient key-value storage library
 */

import { MMKVStorage } from "@/helpers/storage.helper";
import { StateStorage } from "zustand/middleware";

/**
 * Custom storage implementation for Zustand that uses MMKV
 * This allows Zustand stores to persist data between app launches
 *
 * Implements the StateStorage interface required by Zustand's persist middleware
 */
export const zustandStorage: StateStorage = {
  /**
   * Stores a value in MMKV storage
   *
   * @param name - The key to store the value under
   * @param value - The string value to store
   * @returns void
   */
  setItem: (name, value) => {
    return MMKVStorage.set(name, value);
  },

  /**
   * Retrieves a value from MMKV storage
   *
   * @param name - The key to retrieve the value for
   * @returns The stored string value or null if not found
   */
  getItem: (name) => {
    const value = MMKVStorage.getString(name);
    return value ?? null;
  },

  /**
   * Removes a value from MMKV storage
   *
   * @param name - The key to remove
   * @returns void
   */
  removeItem: (name) => {
    return MMKVStorage.remove(name);
  },
};
