import { useState } from 'react';

export type SortBy<T> = {
  key: keyof T | null;
  direction: 'asc' | 'dsc' | null;
};
export default function useTableSort<T>() {
  const [sortBy, setSortBy] = useState<SortBy<T>>({
    key: null,
    direction: null,
  });

  const handleSortClick = (newSortKey: keyof T) => {
    setSortBy((prev) => {
      const newDirection = prev.direction
        ? prev.direction === 'asc'
          ? 'dsc'
          : null
        : 'asc';
      const newKey = newDirection !== null ? newSortKey : null;
      return {
        key: newKey,
        direction: newDirection,
      };
    });
  };
  return {
    sortBy,
    handleSortClick,
  };
}
