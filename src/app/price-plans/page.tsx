"use client";
import { useState } from "react";
import Table from "../../components/Table/Table";
import EditModal from "../../components/Modal/EditModal";
import { usePricePlansStore } from "../../lib/store/dataStore";
import { ColumnConfig, PricePlan } from "../../lib/types/entities";

export default function PricePlansPage() {
  const { filteredData, setSort, addFilter, removeFilter, updateRow } =
    usePricePlansStore();
  const [editingRow, setEditingRow] = useState<PricePlan | null>(null);

  const columns: ColumnConfig<PricePlan>[] = [
    { key: "id", label: "ID", sortable: true },
    {
      key: "description",
      label: "Description",
      sortable: true,
      editable: true,
      filterable: true,
      filterType: "text",
      editableCondition: (row) => row.active,
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
    {
      key: "removedAt",
      label: "Removed At",
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
      <h1 className="text-2xl mb-4">Price Plans</h1>
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
