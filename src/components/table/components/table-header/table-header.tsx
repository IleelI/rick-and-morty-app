import clsx from 'clsx';
import { KeyboardEvent } from 'react';
import { TableColumns } from '../../table';
import { SortBy } from '../useTableSort';
import { getSortingIndicator } from './helpers';

type Props<T> = {
  columns: TableColumns<T>;
  sortBy: SortBy<T>;
  handleSortClick: (newSortBy: keyof T) => void;
};
export default function TableHeader<T>({
  columns,
  sortBy,
  handleSortClick,
}: Props<T>) {
  const handleKeyDown = (
    { code }: KeyboardEvent,
    key: keyof T,
    disableSort?: boolean
  ) => {
    if (code.toLocaleLowerCase() === 'enter' && !disableSort) {
      handleSortClick(key);
    }
  };

  return (
    <thead>
      <tr>
        {columns.map(({ header, key, disableSort }) => {
          const isSortActive = key === sortBy?.key;
          const sortingIndicator = getSortingIndicator({
            key,
            sortBy,
            disableSort,
          });
          return (
            <th
              key={key.toString()}
              tabIndex={0}
              onKeyDown={(event) => handleKeyDown(event, key, disableSort)}
              onClick={() => (disableSort ? undefined : handleSortClick(key))}
              className={clsx([
                'sticky top-0 z-10 text-left p-4 outline-none rounded-xl bg-gray-700 transition-colors duration-300',
                'hover:text-blue-300',
                'focus:text-blue-300',
                disableSort ? 'cursor-default' : 'cursor-pointer',
              ])}
            >
              {header}
              <span
                className={clsx([
                  'pl-2 transition-opacity',
                  isSortActive ? 'opacity-100' : 'opacity-40',
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
