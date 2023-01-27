import clsx from 'clsx';
import { TableColumns } from '../../table';

type Props<T> = {
  columns: TableColumns<T>;
  handleSortClick: (newSortBy: keyof T) => void;
};
function TableHeader<T>({ columns, handleSortClick }: Props<T>) {
  return (
    <thead>
      <tr>
        {columns.map(({ header, key, disableSort }) => {
          return (
            <th
              key={key.toString()}
              className={clsx([
                disableSort ? 'cursor-default' : 'cursor-pointer',
              ])}
              onClick={() => (disableSort ? undefined : handleSortClick(key))}
            >
              {header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
