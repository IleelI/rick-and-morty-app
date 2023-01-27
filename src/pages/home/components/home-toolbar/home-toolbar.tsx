import { ChangeEvent } from 'react';

type HomeToolbarProps = {
  count: number;
  isFetching: boolean;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
export default function HomeToolbar({
  count,
  isFetching,
  handleSearchChange,
}: HomeToolbarProps) {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-xl text-gray-100 font-medium">
        Results ({count}){' '}
        <span className="text-xs tracking-wide font-light text-blue-300">
          {isFetching ? 'Fetching results...' : ''}
        </span>
      </h1>
      <div className="relative flex flex-col gap-2">
        <label htmlFor="name-filter" />
        <input
          id="name-filter"
          name="name-filter"
          placeholder="Search for a character"
          className="w-full max-w-sm px-4 py-3 rounded-xl font-medium text-sm border border-gray-700 text-gray-200 bg-gray-800"
          onChange={handleSearchChange}
        />
      </div>
    </header>
  );
}
