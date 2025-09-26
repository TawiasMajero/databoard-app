"use client";
import { useState } from "react";
import Table from "../../components/Table/Table";
import EditModal from "../../components/Modal/EditModal";
import { usePagesStore } from "../../lib/store/dataStore";
import { ColumnConfig, Page } from "../../lib/types/entities";

export default function PagesPage() {
  const { filteredData, setSort, addFilter, removeFilter, updateRow } =
    usePagesStore();
  const [editingRow, setEditingRow] = useState<Page | null>(null);

  const columns: ColumnConfig<Page>[] = [
    { key: "id", label: "ID", sortable: true },
    {
      key: "title",
      label: "Title",
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
      key: "updatedAt",
      label: "Updated At",
      sortable: true,
      editable: true,
      filterable: true,
      filterType: "dateRange",
      render: (value: unknown) =>
        new Date(value as string).toLocaleDateString(),
    },
    {
      key: "publishedAt",
      label: "Published At",
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
      <h1 className="text-2xl mb-4">Pages</h1>
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
