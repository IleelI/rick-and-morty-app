import { useState } from 'react';

export default function useTableSort<T>() {
  const [sortBy, setSortBy] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'dsc' | null;
  }>({
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
      return {
        key: newSortKey,
        direction: newDirection,
      };
    });
  };
  return {
    sortBy,
    handleSortClick,
  };
}
