import { debounce } from 'lodash';
import { useState, useMemo, ChangeEvent } from 'react';

const SEARCH_DELAY = 1_000;

type UseSearchParams = {
  initialValue?: string;
  callback?: () => void;
};
export default function useSearch({
  initialValue = '',
  callback,
}: UseSearchParams = {}) {
  const [search, setSearch] = useState(initialValue);

  const handleSearchChange = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        callback?.();
      }, SEARCH_DELAY),
    [callback]
  );

  return {
    search,
    handleSearchChange,
  };
}
