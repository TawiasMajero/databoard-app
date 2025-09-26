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

export const getNestedValue = <T>(obj: T, key: string): unknown => {
  let current: unknown = obj;
  for (const k of key.split(".")) {
    if (current && typeof current === "object" && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }
  return current;
};

export const setNestedValue = <T>(
  obj: T,
  key: string,
  value: unknown
): void => {
  let current: unknown = obj;
  const keys = key.split(".");
  const lastKey = keys.pop()!;
  for (const k of keys) {
    if (current && typeof current === "object") {
      if (!(k in current)) {
        (current as Record<string, unknown>)[k] = {};
      }
      current = (current as Record<string, unknown>)[k];
    } else {
      return; // Cannot set on non-object
    }
  }
  if (current && typeof current === "object") {
    (current as Record<string, unknown>)[lastKey] = value;
  }
};
