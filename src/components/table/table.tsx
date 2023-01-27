import clsx from 'clsx';
import { ReactNode, useMemo, useState } from 'react';
import TableBody from './components/table-body/table-body';
import TableHeader from './components/table-header/table-header';
import useTableSort from './components/useTableSort';

export type TableColumn<T> = {
  key: keyof T;
  header: string;
  disableSort?: boolean;
  render?: (row: T, column: TableColumn<T>) => ReactNode;
};
export type TableColumns<T> = TableColumn<T>[];

type TableProps<T> = {
  data: T[];
  columns: TableColumns<T>;
  emptyText: string;
  containerClasses?: string;
};
function Table<T>({
  data,
  columns,
  emptyText,
  containerClasses = '',
}: TableProps<T>) {
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
  const hasData = sortedData.length > 0;

  if (!hasData) {
    return (
      <div className="px-4 py-10 text-center text-lg rounded-xl text-gray-400 bg-gray-800">
        {emptyText}
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl">
      <div className={clsx([containerClasses, 'relative overflow-scroll'])}>
        <table className="w-full bg-gray-800">
          <TableHeader
            columns={columns}
            sortBy={sortBy}
            handleSortClick={handleSortClick}
          />
          <TableBody data={sortedData} columns={columns} />
        </table>
      </div>
    </div>
  );
}

export default Table;
