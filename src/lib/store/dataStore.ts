import { create } from "zustand";
import { Page, Product, PricePlan } from "../types/entities";
import { mockPages, mockProducts, mockPricePlans } from "../data/mockData";
import { sortData } from "../utils/sorting";
import { applyFilters, Filter } from "../utils/filtering";

interface DataState<T> {
  data: T[];
  filteredData: T[];
  sort: { key: string; direction: "asc" | "desc" };
  filters: Filter[];
  setData: (data: T[]) => void;
  setSort: (key: string, direction: "asc" | "desc") => void;
  addFilter: (filter: Filter) => void;
  removeFilter: (key: string) => void;
  updateRow: (id: number, updatedRow: T) => void;
}

export const createDataStore = <T extends { id: number }>(initialData: T[]) =>
  create<DataState<T>>((set) => ({
    data: initialData,
    filteredData: initialData,
    sort: { key: "", direction: "asc" },
    filters: [],
    setData: (data) => set({ data, filteredData: data }),
    setSort: (key, direction) =>
      set((state) => ({
        sort: { key, direction },
        filteredData: sortData(
          applyFilters(state.data, state.filters),
          key,
          direction
        ),
      })),
    addFilter: (filter) =>
      set((state) => {
        const filters = [
          ...state.filters.filter((f) => f.key !== filter.key),
          filter,
        ];
        return { filters, filteredData: applyFilters(state.data, filters) };
      }),
    removeFilter: (key) =>
      set((state) => {
        const filters = state.filters.filter((f) => f.key !== key);
        return { filters, filteredData: applyFilters(state.data, filters) };
      }),
    updateRow: (id, updatedRow) =>
      set((state) => {
        const data = state.data.map((row) =>
          row.id === id ? updatedRow : row
        );
        return { data, filteredData: applyFilters(data, state.filters) };
      }),
  }));

export const usePagesStore = createDataStore<Page>(mockPages);
export const useProductsStore = createDataStore<Product>(mockProducts);
export const usePricePlansStore = createDataStore<PricePlan>(mockPricePlans);
