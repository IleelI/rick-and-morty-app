import { SortBy } from '../useTableSort';

export function getSortingIndicator<T>({
  key,
  sortBy,
  disableSort,
}: {
  key: keyof T;
  sortBy: SortBy<T>;
  disableSort?: boolean;
}) {
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

  return sortingIndicator;
}
