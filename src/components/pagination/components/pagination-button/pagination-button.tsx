import clsx from 'clsx';

type PaginationButtonProps = {
  label: string;
  isDisabled: boolean;
  handleClick: () => void;
};
export default function PaginationButton({
  label,
  isDisabled,
  handleClick,
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={clsx([
        'font-medium select-none transition-colors',
        'hover:text-blue-300',
        'disabled:opacity-40 disabled:pointer-events-none',
      ])}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
