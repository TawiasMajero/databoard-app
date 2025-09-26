import React from "react";
import { ColumnConfig } from "../../lib/types/entities";
import { getNestedValue } from "../../lib/utils/sorting";

interface TableRowProps<T> {
  row: T;
  columns: ColumnConfig<T>[];
  onEdit: () => void;
}

const TableRowComponent = <T extends { id: number }>({
  row,
  columns,
  onEdit,
}: TableRowProps<T>) => {
  return (
    <tr>
      {columns.map((column) => {
        if (column.key === "edit") {
          return (
            <td key="edit" className="border p-2">
              <button
                onClick={onEdit}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
            </td>
          );
        }
        const value = getNestedValue(row, column.key as string);
        return (
          <td key={column.key as string} className="border p-2">
            {column.render ? column.render(value, row) : value}
          </td>
        );
      })}
    </tr>
  );
};

const TableRow = React.memo(TableRowComponent) as typeof TableRowComponent;

export default TableRow;
