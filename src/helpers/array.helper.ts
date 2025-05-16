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

export function dedupArrayHelper<T>(arr: T[]): T[] {
  const s = new Set(arr);
  return [...s];
}
