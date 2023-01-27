import { ReactNode, useMemo, useState } from 'react';
import TableBody from './components/table-body/table-body';
import TableHeader from './components/table-header/table-header';
import useTableSort from './components/useTableSort';

export type TableColumn<T> = {
  key: keyof T;
  header: string;
  render?: (row: T, column: TableColumn<T>) => ReactNode;
  disableSort?: boolean;
};
export type TableColumns<T> = TableColumn<T>[];

type TableProps<T> = {
  data: T[];
  columns: TableColumns<T>;
  emptyText: string;
};
function Table<T>({ data, columns, emptyText }: TableProps<T>) {
  const { sortBy, handleSortClick } = useTableSort<T>();

  const sortedData = useMemo(
    () =>
      [...data].sort((a, b) => {
        if (!sortBy?.key) return 0;
        const direction = sortBy.direction;
        const aValue = a[sortBy.key];
        const bValue = b[sortBy.key];
        switch (direction) {
          case 'asc': {
            return aValue < bValue ? -1 : 1;
          }
          case 'dsc': {
            return bValue > aValue ? 1 : -1;
          }
          case null: {
            return 0;
          }
        }
      }),
    [data, sortBy?.key, sortBy.direction]
  );

  if (!data.length) {
    return (
      <div>
        <p>{emptyText}</p>
      </div>
    );
  }
  return (
    <table className="w-full rounded-xl overflow-hidden bg-gray-800">
      <TableHeader
        columns={columns}
        sortBy={sortBy}
        handleSortClick={handleSortClick}
      />
      <TableBody data={sortedData} columns={columns} />
    </table>
  );
}

export default Table;
