import { ColumnConfig } from "../../lib/types/entities";

interface TableHeaderProps<T> {
  columns: ColumnConfig<T>[];
  onSort: (key: string, direction: "asc" | "desc") => void;
}

const TableHeader = <T,>({ columns, onSort }: TableHeaderProps<T>) => {
  return (
    <thead className="bg-gray-200">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key as string}
            className="border p-2 text-left cursor-pointer"
            onClick={() =>
              column.sortable && onSort(column.key as string, "asc")
            } // Можно добавить toggle для direction
          >
            {column.label}
            {column.sortable && <span> ⇅</span>}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
