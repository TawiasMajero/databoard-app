import { useState } from "react";
import { ColumnConfig } from "../../lib/types/entities";
import { Filter } from "../../lib/utils/filtering";

interface FilterPanelProps<T> {
  columns: ColumnConfig<T>[];
  onFilter: (filter: Filter) => void;
  onRemoveFilter: (key: string) => void;
}

const FilterPanel = <T,>({
  columns,
  onFilter,
  onRemoveFilter,
}: FilterPanelProps<T>) => {
  const [dateRanges, setDateRanges] = useState<{
    [key: string]: { from: string; to: string };
  }>({});

  const handleDateChange = (
    key: string,
    type: "from" | "to",
    value: string
  ) => {
    const range = { ...(dateRanges[key] || { from: "", to: "" }) };
    range[type] = value;
    setDateRanges({ ...dateRanges, [key]: range });
    if (range.from || range.to) {
      onFilter({ key, value: range, type: "dateRange" });
    } else {
      onRemoveFilter(key);
    }
  };

  return (
    <div className="mb-4 flex flex-wrap gap-4">
      {columns
        .filter((c) => c.filterable)
        .map((column) => (
          <div key={column.key as string} className="flex flex-col">
            <label className="text-sm">{column.label as string}</label>
            {column.filterType === "text" && (
              <input
                type="text"
                className="border p-1"
                placeholder="Search..."
                onChange={(e) =>
                  e.target.value
                    ? onFilter({
                        key: column.key as string,
                        value: e.target.value,
                        type: "text",
                      })
                    : onRemoveFilter(column.key as string)
                }
              />
            )}
            {column.filterType === "boolean" && (
              <select
                className="border p-1"
                onChange={(e) => {
                  if (e.target.value === "") {
                    onRemoveFilter(column.key as string);
                  } else {
                    onFilter({
                      key: column.key as string,
                      value: e.target.value === "true",
                      type: "boolean",
                    });
                  }
                }}
              >
                <option value="">All</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            )}
            {column.filterType === "dateRange" && (
              <div className="flex gap-2">
                <input
                  type="date"
                  className="border p-1"
                  onChange={(e) =>
                    handleDateChange(
                      column.key as string,
                      "from",
                      e.target.value
                    )
                  }
                />
                <input
                  type="date"
                  className="border p-1"
                  onChange={(e) =>
                    handleDateChange(column.key as string, "to", e.target.value)
                  }
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default FilterPanel;
