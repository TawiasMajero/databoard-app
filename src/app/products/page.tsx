"use client";
import { useState } from "react";
import Table from "../../components/Table/Table";
import EditModal from "../../components/Modal/EditModal";
import { useProductsStore } from "../../lib/store/dataStore";
import { ColumnConfig, Product } from "../../lib/types/entities";

export default function ProductsPage() {
  const { filteredData, setSort, addFilter, removeFilter, updateRow } =
    useProductsStore();
  const [editingRow, setEditingRow] = useState<Product | null>(null);

  const columns: ColumnConfig<Product>[] = [
    { key: "id", label: "ID", sortable: true },
    {
      key: "name",
      label: "Name",
      sortable: true,
      editable: true,
      filterable: true,
      filterType: "text",
      editableCondition: (row) => row.active,
    },
    {
      key: "options.size",
      label: "Size",
      render: (value: unknown) => (value as string) || "N/A",
      sortable: true,
      editable: true,
      filterable: true,
      filterType: "text",
    },
    {
      key: "options.amount",
      label: "Amount",
      render: (value: unknown) => (value as number).toString(),
      sortable: true,
      editable: true,
    },
    {
      key: "active",
      label: "Active",
      sortable: true,
      editable: true,
      filterable: true,
      filterType: "boolean",
    },
    {
      key: "createdAt",
      label: "Created At",
      sortable: true,
      editable: true,
      filterable: true,
      filterType: "dateRange",
      render: (value: unknown) =>
        new Date(value as string).toLocaleDateString(),
    },
    { key: "edit", label: "Edit" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Products</h1>
      <Table
        data={filteredData}
        columns={columns}
        onSort={setSort}
        onFilter={addFilter}
        onRemoveFilter={removeFilter}
        onEdit={setEditingRow}
      />
      {editingRow && (
        <EditModal
          isOpen={!!editingRow}
          onClose={() => setEditingRow(null)}
          row={editingRow}
          columns={columns}
          onSave={(updatedRow) => {
            updateRow(updatedRow.id, updatedRow);
            setEditingRow(null);
          }}
        />
      )}
    </div>
  );
}
