export interface Filter {
  key: string;
  value: string | boolean | { from: string; to: string };
  type: "text" | "boolean" | "dateRange";
}

export const applyFilters = <T>(data: T[], filters: Filter[]): T[] => {
  return data.filter((row) =>
    filters.every((filter) => {
      const value = getNestedValue(row, filter.key);
      if (filter.type === "text") {
        return (
          typeof value === "string" &&
          value.toLowerCase().includes((filter.value as string).toLowerCase())
        );
      }
      if (filter.type === "boolean") {
        return value === filter.value;
      }
      if (filter.type === "dateRange") {
        const date = new Date(value);
        const { from, to } = filter.value as { from: string; to: string };
        return (
          (!from || date >= new Date(from)) && (!to || date <= new Date(to))
        );
      }
      return true;
    })
  );
};

import { getNestedValue } from "./sorting";
