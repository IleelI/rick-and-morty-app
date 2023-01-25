import clsx from 'clsx';
import { useMemo } from 'react';
import usePagination, { getVisiblePage } from '../../hooks/usePagination';

type PaginatinonProps = {
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  pagination: ReturnType<typeof usePagination>;
};
function Pagination({
  totalPages,
  hasPrevPage,
  hasNextPage,
  pagination,
}: PaginatinonProps) {
  const {
    currentPage,
    handleGoToPrevPage,
    handleGoToNextPage,
    handleGoToPage,
  } = pagination;

  const visiblePages = useMemo(
    () => getVisiblePage(currentPage, totalPages),
    [currentPage, totalPages]
  );

  if (!totalPages) {
    return null;
  }

  return (
    <nav className="relative flex justify-center items-center gap-16">
      <section className="flex justify-center items-center gap-8">
        <button
          type="button"
          disabled={!hasPrevPage}
          className="font-medium underline underline-offset-4"
          onClick={() => handleGoToPrevPage(hasPrevPage)}
        >
          Prev
        </button>
        <ul className="flex items-center gap-8">
          {visiblePages.map((item) => (
            <li
              key={`currentPage-${item}`}
              role="button"
              className={clsx([
                'p-2 -m-2',
                'hover:text-blue-300 transition-colors',
                item === currentPage && 'text-blue-300',
              ])}
              onClick={() => handleGoToPage(item, totalPages)}
            >
              {item}
            </li>
          ))}
        </ul>
        <button
          type="button"
          disabled={!hasNextPage}
          className="font-medium underline underline-offset-4"
          onClick={() => handleGoToNextPage(hasNextPage)}
        >
          Next
        </button>
      </section>
    </nav>
  );
}

export default Pagination;
