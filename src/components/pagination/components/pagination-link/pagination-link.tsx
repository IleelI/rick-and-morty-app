import clsx from 'clsx';

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
  return (
    <li
      role="link"
      className={clsx([
        'p-2 -m-2 cursor-pointer select-none transition-colors',
        'hover:text-blue-300',
        page === currentPage && 'text-blue-300 underline underline-offset-4',
      ])}
      onClick={() => handleGoToPage(page, totalPages)}
    >
      {page}
    </li>
  );
}
