import clsx from 'clsx';
import { TableColumns } from '../../table';
import { SortBy } from '../useTableSort';

type Props<T> = {
  columns: TableColumns<T>;
  sortBy: SortBy<T>;
  handleSortClick: (newSortBy: keyof T) => void;
};
function TableHeader<T>({ columns, sortBy, handleSortClick }: Props<T>) {
  return (
    <thead>
      <tr>
        {columns.map(({ header, key, disableSort }) => {
          const isSortActive = sortBy?.key === key;
          const sortingIndicator = isSortActive
            ? sortBy.direction
              ? sortBy.direction === 'asc'
                ? '↓'
                : '↑'
              : '↓'
            : disableSort
            ? ''
            : '↓';

          return (
            <th
              key={key.toString()}
              className={clsx([
                'text-left p-4 bg-gray-700 transition-colors duration-300',
                'hover:text-blue-300',
                disableSort ? 'cursor-default' : 'cursor-pointer',
              ])}
              onClick={() => (disableSort ? undefined : handleSortClick(key))}
            >
              {header}
              <span
                className={clsx([
                  'pl-2 transition-opacity',
                  isSortActive ? 'opacity-100' : 'opacity-60',
                ])}
              >
                {sortingIndicator}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
