import { TableColumns } from '../../table';

type Props<T> = {
  data: T[];
  columns: TableColumns<T>;
};
function TableBody<T>({ data, columns }: Props<T>) {
  return (
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {columns.map((column) => {
            const cellValue = column?.render
              ? column.render(row, column)
              : String(row[column.key]);
            return <td key={column.key.toString()}>{cellValue}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
