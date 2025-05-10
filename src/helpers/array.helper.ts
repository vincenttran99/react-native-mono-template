import { IGeographic, ILabelValue } from "models/system.model";

export function uniqByHelper(
  arr: any[],
  predicate: string | ((item: any) => string)
) {
  const cb =
    typeof predicate === "function" ? predicate : (o: any) => o[predicate];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values(),
  ];
}

export function chunkArrayHelper(array: any[], chunkSize: number) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export function sortObjectArrayHelper<T>(
  arr: T[],
  field: keyof T,
  order: "asc" | "desc" = "asc"
): T[] {
  return arr.sort((a, b) => {
    if (a[field] < b[field]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
}

export function handleInOutArrayHelper(
  inputArray: any[],
  itemHandle: any,
  predicate: string | ((item: any) => string)
) {
  const cb =
    typeof predicate === "function" ? predicate : (o: any) => o[predicate];

  let key = cb(itemHandle);
  let indexOfId = inputArray?.findIndex((item) => cb(item) === key);
  if (indexOfId === -1) {
    return [...inputArray, itemHandle];
  } else {
    let newArr = [...inputArray];
    newArr.splice(indexOfId, 1);
    return newArr;
  }
}

export function convertArrayToObjectHelper<T>(
  posts: T[],
  keyId: string
): Record<string, T> {
  return posts.reduce((acc, post) => {
    // @ts-ignore
    acc[String(post?.[keyId])] = post;
    return acc;
  }, {} as Record<string, T>);
}

export function dedupArrayHelper<T>(arr: T[]): T[] {
  const s = new Set(arr);
  return [...s];
}
