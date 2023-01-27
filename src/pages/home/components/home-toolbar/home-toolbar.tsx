import { ChangeEvent } from 'react';

type HomeToolbarProps = {
  count: number;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
export default function HomeToolbar({
  count,
  handleSearchChange,
}: HomeToolbarProps) {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-xl text-gray-100 font-medium">Results ({count})</h1>
      <div>
        <label htmlFor="name-filter" />
        <input
          id="name-filter"
          name="name-filter"
          placeholder="Search for a character"
          className="w-96 px-4 py-3 rounded-xl font-medium text-sm border border-gray-700 text-gray-200 bg-gray-800"
          onChange={handleSearchChange}
        />
      </div>
    </header>
  );
}
