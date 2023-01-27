import clsx from 'clsx';
import { KeyboardEvent, useCallback } from 'react';

type PaginationLinkProps = {
  page: number;
  currentPage: number;
  totalPages: number;
  handleGoToPage: (page: number, totalPages: number) => void;
};
export default function PaginationLink({
  page,
  currentPage,
  totalPages,
  handleGoToPage,
}: PaginationLinkProps) {
  const handleKeyDown = useCallback(
    ({ code }: KeyboardEvent) => {
      if (code.toLocaleLowerCase() === 'enter') {
        handleGoToPage(page, totalPages);
      }
    },
    [page, totalPages]
  );

  return (
    <li
      role="link"
      tabIndex={0}
      className={clsx([
        'p-2 -m-2 cursor-pointer select-none transition-colors',
        'hover:text-blue-300',
        page === currentPage && 'text-blue-300 underline underline-offset-4',
      ])}
      onKeyDown={handleKeyDown}
      onClick={() => handleGoToPage(page, totalPages)}
    >
      {page}
    </li>
  );
}
