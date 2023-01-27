import usePagination from '@/hooks/usePagination';
import clsx from 'clsx';
import PaginationButton from './components/pagination-button/pagination-button';
import PaginationLinks from './components/pagination-links/pagination-links';

type PaginatinonProps = {
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  pagination: ReturnType<typeof usePagination>;
  hideButtons?: boolean;
};
function Pagination({
  totalPages,
  hasPrevPage,
  hasNextPage,
  pagination,
  hideButtons = false,
}: PaginatinonProps) {
  const {
    currentPage,
    handleGoToPrevPage,
    handleGoToNextPage,
    handleGoToPage,
  } = pagination;

  if (!totalPages) {
    return null;
  }
  return (
    <nav
      role="navigation"
      aria-label="Pagination navigation"
      className="w-full flex items-center justify-center gap-4"
    >
      {!hideButtons && (
        <PaginationButton
          label="Previous"
          isDisabled={!hasPrevPage}
          handleClick={() => handleGoToPrevPage(hasPrevPage)}
        />
      )}
      <PaginationLinks
        currentPage={currentPage}
        totalPages={totalPages}
        handleGoToPage={handleGoToPage}
      />
      {!hideButtons && (
        <PaginationButton
          label="Next"
          isDisabled={!hasNextPage}
          handleClick={() => handleGoToNextPage(hasNextPage)}
        />
      )}
    </nav>
  );
}

export default Pagination;
