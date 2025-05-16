/**
 * Removes duplicate items from an array based on a specified property or function
 * This is more advanced than simple deduplication as it allows custom key generation
 * 
 * @param arr - The input array to remove duplicates from
 * @param predicate - Either a property name or a function that returns a unique key for each item
 * @returns A new array with duplicates removed, keeping the first occurrence of each item
 * 
 * @example
 * // Using a property name
 * const users = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' },
 *   { id: 1, name: 'John (duplicate)' }
 * ];
 * const uniqueUsers = uniqueByPropertyHelper(users, 'id');
 * // Result: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
 * 
 * @example
 * // Using a function
 * const items = [
 *   { type: 'fruit', name: 'apple' },
 *   { type: 'vegetable', name: 'carrot' },
 *   { type: 'fruit', name: 'banana' }
 * ];
 * const uniqueByType = uniqueByPropertyHelper(items, item => item.type);
 * // Result: [{ type: 'fruit', name: 'apple' }, { type: 'vegetable', name: 'carrot' }]
 */
export function uniqueByPropertyHelper(
  arr: any[],
  predicate: string | ((item: any) => string)
) {
  // Convert string predicate to function that accesses the property
  const keyGenerator =
    typeof predicate === "function" ? predicate : (item: any) => item[predicate];

  // Use Map to track unique keys and their corresponding items
  return [
    ...arr
      .reduce((uniqueMap, item) => {
        // Generate key for the current item, handling null/undefined
        const key = item === null || item === undefined ? item : keyGenerator(item);

        // Only add item to map if its key hasn't been seen before
        uniqueMap.has(key) || uniqueMap.set(key, item);

        return uniqueMap;
      }, new Map())
      .values(),
  ];
}

/**
 * Removes duplicate primitive values from an array
 * Uses Set for efficient O(n) deduplication of primitive values
 * 
 * @template T - The type of elements in the array
 * @param arr - The input array to remove duplicates from
 * @returns A new array with all duplicate elements removed
 * 
 * @example
 * const numbers = [1, 2, 2, 3, 1, 4, 5, 5];
 * const uniqueNumbers = removeDuplicatesHelper(numbers);
 * // Result: [1, 2, 3, 4, 5]
 * 
 * @example
 * const fruits = ['apple', 'banana', 'apple', 'orange', 'banana'];
 * const uniqueFruits = removeDuplicatesHelper(fruits);
 * // Result: ['apple', 'banana', 'orange']
 */
export function removeDuplicatesHelper<T>(arr: T[]): T[] {
  // Create a Set from the array to automatically remove duplicates
  const uniqueSet = new Set(arr);
  // Convert Set back to array
  return [...uniqueSet];
}
