import clsx from 'clsx';
import { TableColumns } from '../../table';

type Props<T> = {
  data: T[];
  columns: TableColumns<T>;
};
function TableBody<T>({ data, columns }: Props<T>) {
  return (
    <tbody>
      {data.map((row, index) => (
        <tr
          key={index}
          className={clsx([
            'border-b border-gray-700 transition-colors',
            'hover:bg-gray-700',
            'last:border-0',
          ])}
        >
          {columns.map((column) => {
            const cellValue = column?.render
              ? column.render(row, column)
              : String(row[column.key]);
            return (
              <td
                key={column.key.toString()}
                className={clsx([
                  'p-4 transition-colors',
                  'hover:text-blue-300',
                ])}
              >
                {cellValue}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
