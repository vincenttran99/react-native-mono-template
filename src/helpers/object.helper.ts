/**
 * Retrieves the value from a nested object using a dot-separated path.
 * If the key does not exist, it returns the default value or null.
 *
 * @param {object} obj - The object to retrieve the value from.
 * @param {string} path - The dot-separated path to the desired value.
 * @returns {any} - The value at the specified path or null if not found.
 *
 * Example:
 * const obj = { a: { b: [{ c: 123 }] } };
 * getValueFromPath(obj, 'a.b[0].c'); // Returns: 123
 */
export function getValueFromPathHelper(obj: any, path: string): any {
  // Split the path string into an array of keys
  const keys: { key: string; index?: number }[] = path.split(".").map((key) => {
    // If the key contains brackets [], extract the key and index
    const matches = key.match(/(.+?)\[(\d+)\]/);
    if (matches) {
      return {
        key: matches[1],
        index: parseInt(matches[2]),
      };
    } else {
      return { key };
    }
  });

  // Access the value in the object
  let value: any = obj;
  for (const keyInfo of keys) {
    if (value && value.hasOwnProperty(keyInfo.key)) {
      if (keyInfo.hasOwnProperty("index")) {
        // @ts-ignore
        value = value[keyInfo.key][keyInfo.index];
      } else {
        value = value[keyInfo.key];
      }
    } else {
      // If the key does not exist in the object, return the default value or null
      return null;
    }
  }

  return value;
}

/**
 * Sets a nested value within an object based on a given path.
 * If the nested structure doesn't exist, it creates it.
 *
 * @param {object} obj - The object to set the nested value on.
 * @param {string} path - The dot-separated path to the nested value.
 * @param {any} value - The value to set at the nested path.
 * @returns {void}
 *
 * Example:
 * const obj = {};
 * setNestedValue(obj, 'nested.value', 10);
 * // obj will be { nested: { value: 10 } }
 */
export function setNestedValueHelper(
  obj: Record<string, any>,
  path: string,
  value: any
): void {
  const pathArray: string[] = path.split("."); // Convert the path into an array of elements
  let currentObj: Record<string, any> = obj;

  // Iterate through each element in the path
  for (let i = 0; i < pathArray.length - 1; i++) {
    const key: string = pathArray[i];
    if (!currentObj[key]) {
      currentObj[key] = {}; // Create an object if it doesn't exist
    }
    currentObj = currentObj[key]; // Move to the child object
  }

  // Assign the final value in the path
  currentObj[pathArray[pathArray.length - 1]] = value;
}

/**
 * Picks specific properties from an object and returns a new object containing only those properties.
 *
 * @param {object} sourceObject - The source object from which properties will be picked.
 * @param {string[]} propertiesToPick - An array of property names to pick from the source object.
 * @returns {object} - A new object containing only the picked properties.
 *
 * Example:
 * const obj = { name: 'John', age: 30, city: 'New York' };
 * pick(obj, ['name', 'age']); // Returns: { name: 'John', age: 30 }
 */
export const pickHelper = function (
  sourceObject: Record<string, any>,
  propertiesToPick: string[]
): Record<string, any> {
  let pickedProperties: Record<string, any> = {};
  for (let property of propertiesToPick) {
    if (sourceObject.hasOwnProperty(property)) {
      pickedProperties[property] = sourceObject[property];
    }
  }
  return pickedProperties;
};

/**
 * Remove fields with an 'id' field that equals ''.
 * This function prevents sending entities to the server with an empty id,
 * which could result in a 500 error.
 *
 * @param entity The object to be cleaned.
 * @returns A new object with only non-empty 'id' fields.
 */
export function removeEmptyFieldsHelper(
  entity: Record<string, any>
): Record<string, any> {
  // Get keys of the entity that are not objects or have non-empty 'id' fields
  const keysToKeep = Object.keys(entity).filter(
    (key) =>
      !(entity[key] instanceof Object) ||
      (entity[key]?.id !== "" && entity[key]?.id !== -1)
  );

  // Return a new object containing only the non-empty 'id' fields
  return pickHelper(entity, keysToKeep);
}

/**
 * Checks if the provided object is empty.
 *
 * @param obj - The object to be checked for emptiness.
 * @returns {boolean} - Returns true if the object is empty, otherwise false.
 */
export function isEmptyObjectHelper(obj: Record<string, any>): boolean {
  try {
    for (const property in obj) {
      return false;
    }
  } catch (error) {
    // In case of any error, return false
    return false;
  }
  // If the loop completes without finding any property, return true
  return true;
}

/**
 * This function safely parses a JSON string into an object.
 * If the input string is empty or invalid, it returns an empty object.
 *
 * @param {string} [input] - The JSON string to be parsed.
 * @returns {object} - The parsed object, or an empty object if parsing fails or input is empty.
 *
 * Example:
 * parseJSON('{"key": "value"}')
 * // Returns: { key: "value" }
 *
 * parseJSON('')
 * // Returns: {}
 *
 * parseJSON('invalid json')
 * // Returns: {}
 */
export const parseJSONHelper = (input?: string) => {
  if (!input) {
    return {};
  }

  try {
    return JSON.parse(input);
  } catch (error) {
    return {};
  }
};

/**
 * Removes objects from an array based on whether a specified field matches any of the given values.
 *
 * @param {Array<Object>} arr - The array of objects to filter.
 * @param {string} fieldName - The name of the field to match against.
 * @param {Array<any>} valuesToRemove - The array of values to compare against the field.
 * @returns {Array<Object>} - The filtered array of objects.
 *
 * Example:
 * const data = [{ id: 1, name: 'John' }, { id: 2, name: 'Alice' }, { id: 3, name: 'Bob' }];
 * removeObjectsWithMatchingField(data, 'name', ['John', 'Bob']);
 * // Returns: [{ id: 2, name: 'Alice' }]
 */
export function filterObjectsByFieldHelper<T extends Record<string, any>>(
  arr: T[],
  fieldName: keyof T,
  valuesToRemove: Array<T[keyof T]>
): T[] {
  return arr.filter((item) => !valuesToRemove.includes(item[fieldName]));
}
