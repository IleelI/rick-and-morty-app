import { getVisiblePage, INITIAL_PAGE } from '@/hooks/usePagination';
import { useMemo } from 'react';
import PaginationLink from '../pagination-link/pagination-link';

type PaginationLinksProps = {
  currentPage: number;
  totalPages: number;
  handleGoToPage: (page: number, totalPages: number) => void;
};
export default function PaginationLinks({
  currentPage,
  totalPages,
  handleGoToPage,
}: PaginationLinksProps) {
  const visiblePages = useMemo(
    () => getVisiblePage(currentPage, totalPages),
    [currentPage, totalPages]
  );
  const showFirstPage = !visiblePages.includes(INITIAL_PAGE);
  const showLastPage = !visiblePages.includes(totalPages);

  return (
    <ul className="gap-4 flex justify-center items-center">
      {showFirstPage && (
        <>
          <PaginationLink
            page={INITIAL_PAGE}
            currentPage={currentPage}
            totalPages={totalPages}
            handleGoToPage={handleGoToPage}
          />
          <PaginationLinkDivider />
        </>
      )}
      {visiblePages.map((page) => (
        <PaginationLink
          key={`currentPage-${page}`}
          page={page}
          currentPage={currentPage}
          totalPages={totalPages}
          handleGoToPage={handleGoToPage}
        />
      ))}
      {showLastPage && (
        <>
          <PaginationLinkDivider />
          <PaginationLink
            page={totalPages}
            currentPage={currentPage}
            totalPages={totalPages}
            handleGoToPage={handleGoToPage}
          />
        </>
      )}
    </ul>
  );
}

function PaginationLinkDivider() {
  return <li className="cursor-default select-none">...</li>;
}
