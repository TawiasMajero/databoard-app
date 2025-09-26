import { Dialog } from "@headlessui/react";
import { useCallback, useState } from "react";
import { ColumnConfig } from "../../lib/types/entities";
import { getNestedValue, setNestedValue } from "../../lib/utils/sorting";

interface EditModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  row: T;
  columns: ColumnConfig<T>[];
  onSave: (updatedRow: T) => void;
}

const EditModal = <T extends { id: number }>({
  isOpen,
  onClose,
  row,
  columns,
  onSave,
}: EditModalProps<T>) => {
  const [formData, setFormData] = useState<T>({ ...row });

  const handleSave = useCallback(() => {
    onSave(formData);
    onClose();
  }, [formData, onSave, onClose]);

  const handleChange = (key: string, value: unknown) => {
    const newData = { ...formData };
    setNestedValue(newData, key, value);
    setFormData(newData);
  };

  const renderField = (column: ColumnConfig<T>) => {
    const editable =
      column.editable &&
      (column.editableCondition ? column.editableCondition(row) : true);
    if (!editable) return <p className="text-gray-500">Not editable</p>;

    const value = getNestedValue(formData, column.key as string);
    if (column.filterType === "boolean") {
      return (
        <input
          type="checkbox"
          checked={value as boolean}
          onChange={(e) => handleChange(column.key as string, e.target.checked)}
        />
      );
    }
    if (column.filterType === "dateRange") {
      return (
        <input
          type="date"
          value={(value as string).slice(0, 10)} // Форматирование даты
          onChange={(e) => handleChange(column.key as string, e.target.value)}
        />
      );
    }
    return (
      <input
        type="text"
        value={value as string}
        onChange={(e) => handleChange(column.key as string, e.target.value)}
        className="border p-1 w-full"
      />
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-bold mb-4">
            Edit Row
          </Dialog.Title>
          <div className="space-y-4">
            {columns
              .filter((c) => c.editable)
              .map((column) => (
                <div key={column.key as string}>
                  <label className="block text-sm font-medium">
                    {column.label as string}
                  </label>
                  {renderField(column)}
                </div>
              ))}
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditModal;
