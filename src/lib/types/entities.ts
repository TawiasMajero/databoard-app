import React from "react";

export interface Page {
  id: number;
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
}

export interface Product {
  id: number;
  name: string;
  options: { size: string; amount: number };
  active: boolean;
  createdAt: string;
}

export interface PricePlan {
  id: number;
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
}

export type Entity = Page | Product | PricePlan;

export interface ColumnConfig<T> {
  key: keyof T | string;
  label: string | React.JSX.Element;
  render?: (value: unknown, row: T) => React.JSX.Element | string;
  sortable?: boolean;
  editable?: boolean;
  filterable?: boolean;
  filterType?: "text" | "boolean" | "dateRange";
  editableCondition?: (row: T) => boolean;
}
