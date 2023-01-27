import { useState, useCallback } from 'react';

export const INITIAL_PAGE = 1;
const VISIBLE_PAGES_COUNT = 5;

export function getVisiblePage(currentPage: number, totalPages: number) {
  const basePages = [...new Array(VISIBLE_PAGES_COUNT)];
  let transformedPages: number[] = [];
  const pagesOffset = Math.floor(VISIBLE_PAGES_COUNT / 2);

  const startingPagesOffset = currentPage - pagesOffset;
  const endingPagesOffset = currentPage + pagesOffset;

  if (startingPagesOffset <= 0) {
    transformedPages = basePages.map((_, index) => index + 1);
  } else if (endingPagesOffset >= totalPages) {
    transformedPages = basePages.map(
      (_, index) => totalPages - VISIBLE_PAGES_COUNT + index + 1
    );
  } else {
    transformedPages = basePages.map(
      (_, index) => currentPage - pagesOffset + index
    );
  }

  return transformedPages.filter((page) => page <= totalPages && page > 0);
}

export default function usePagination() {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

  const handleGoToNextPage = useCallback(
    (hasNextPage: boolean) => {
      setCurrentPage((prev) => (hasNextPage ? prev + 1 : prev));
    },
    [setCurrentPage]
  );

  const handleGoToPrevPage = useCallback(
    (hasPrevPage: boolean) => {
      setCurrentPage((prev) => (hasPrevPage && prev > 1 ? prev - 1 : prev));
    },
    [setCurrentPage]
  );

  const handleGoToPage = useCallback(
    (newPage: number, totalPages: number) => {
      if (newPage < 1) {
        setCurrentPage(INITIAL_PAGE);
      } else if (newPage > totalPages) {
        setCurrentPage(totalPages);
      } else {
        setCurrentPage(newPage);
      }
    },
    [setCurrentPage]
  );

  return {
    currentPage,
    setCurrentPage,
    handleGoToPage,
    handleGoToNextPage,
    handleGoToPrevPage,
  };
}
