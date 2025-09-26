export const sortData = <T>(
  data: T[],
  key: string,
  direction: "asc" | "desc"
): T[] => {
  return [...data].sort((a, b) => {
    const valueA = getNestedValue(a, key);
    const valueB = getNestedValue(b, key);

    if (typeof valueA === "string" && typeof valueB === "string") {
      return direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    if (typeof valueA === "number" && typeof valueB === "number") {
      return direction === "asc" ? valueA - valueB : valueB - valueA;
    }
    if (valueA instanceof Date && valueB instanceof Date) {
      return direction === "asc"
        ? valueA.getTime() - valueB.getTime()
        : valueB.getTime() - valueA.getTime();
    }
    return 0;
  });
};

export const getNestedValue = (obj: any, key: string): any => {
  return key.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
};

export const setNestedValue = (obj: any, key: string, value: any): any => {
  const keys = key.split(".");
  const lastKey = keys.pop()!;
  const lastObj = keys.reduce((o, k) => (o[k] = o[k] || {}), obj);
  lastObj[lastKey] = value;
};
