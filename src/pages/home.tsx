import { useMemo } from 'react';
import { useQuery } from 'react-query';
import Pagination from '../components/pagination/pagination';
import Table, { TableColumns } from '../components/table/table';
import usePagination from '../hooks/usePagination';
import useSearch from '../hooks/useSearch';
import { getCharacters } from '../services/rickAndMorty/rickAndMorty';
import { Character } from '../services/rickAndMorty/types';

export default function Home() {
  const pagination = usePagination();
  const { search, handleSearchChange } = useSearch({
    callback: () => pagination.setCurrentPage(1),
  });
  const { data, isLoading } = useQuery({
    queryFn: () =>
      getCharacters({
        page: pagination.currentPage,
        filters: {
          name: search,
        },
      }),
    queryKey: ['get-characters', pagination.currentPage, search],
    keepPreviousData: true,
  });

  const results = data?.data ?? [];
  const meta = data?.meta;

  const columns: TableColumns<Character> = useMemo(
    () => [
      {
        key: 'name',
        header: 'Name',
        render: ({ name }) => name,
      },
      {
        key: 'status',
        header: 'Status',
        render: ({ status }) => status,
      },
      {
        key: 'species',
        header: 'Species',
        render: ({ species }) => species,
      },
      {
        key: 'url',
        header: 'Reference',
        render: ({ name, url }) => <a href={url}>{`${name} reference`}</a>,
      },
    ],
    []
  );

  return (
    <main>
      <h1>Rick and Morty App</h1>

      {isLoading ? (
        <div>
          <p>Loading</p>
        </div>
      ) : (
        <article className="flex flex-col gap-8">
          <header>
            <h1>Results ({meta?.count ?? 0})</h1>
            <label htmlFor="name-filter" />
            <input
              id="name-filter"
              name="name-filter"
              onChange={handleSearchChange}
              className="bg-gray-800 rounded-xl px-4 py-2 text-sm text-gray-200 font-medium"
            />
          </header>

          <Table
            data={results}
            columns={columns}
            emptyText="There are no results"
          />
          <Pagination
            pagination={pagination}
            totalPages={meta?.pages ?? 0}
            hasPrevPage={Boolean(meta?.prev)}
            hasNextPage={Boolean(meta?.next)}
          />
        </article>
      )}
    </main>
  );
}
