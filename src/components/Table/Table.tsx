import { useMemo } from "react";
import { ColumnConfig } from "../../lib/types/entities";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import FilterPanel from "../Filters/FilterPanel";
import { Filter } from "../../lib/utils/filtering";

interface TableProps<T extends { id: number }> {
  data: T[];
  columns: ColumnConfig<T>[];
  onSort: (key: string, direction: "asc" | "desc") => void;
  onFilter: (filter: Filter) => void;
  onRemoveFilter: (key: string) => void;
  onEdit: (row: T) => void;
}

const Table = <T extends { id: number }>({
  data,
  columns,
  onSort,
  onFilter,
  onRemoveFilter,
  onEdit,
}: TableProps<T>) => {
  const memoizedColumns = useMemo(() => columns, [columns]);

  return (
    <div className="p-4">
      <FilterPanel
        columns={columns}
        onFilter={onFilter}
        onRemoveFilter={onRemoveFilter}
      />
      <table className="w-full border-collapse border border-gray-300">
        <TableHeader columns={memoizedColumns} onSort={onSort} />
        <tbody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              columns={memoizedColumns}
              onEdit={() => onEdit(row)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
