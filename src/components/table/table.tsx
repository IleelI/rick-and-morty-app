import { ReactNode } from 'react';
import { uniqueId } from 'lodash';

export type TableColumn<T> = {
  key: keyof T;
  header: string;
  render?: (row: T, column: TableColumn<T>) => ReactNode;
};
export type TableColumns<T> = TableColumn<T>[];

const generateKey = () => uniqueId('key_');

type TableProps<T> = {
  data: T[];
  columns: TableColumns<T>;
  emptyText: string;
};
function Table<T>({ data, columns, emptyText }: TableProps<T>) {
  if (!data.length) {
    return (
      <div>
        <p>{emptyText}</p>
      </div>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ header }) => (
            <th key={generateKey()}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={generateKey()}>
            {columns.map((column) => {
              const cellValue = column?.render
                ? column.render(row, column)
                : String(row[column.key]);
              return <td key={generateKey()}>{cellValue}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
