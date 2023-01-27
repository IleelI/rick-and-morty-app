import Pagination from '@/components/pagination/pagination';
import Table, { TableColumns } from '@/components/table/table';
import usePagination from '@/hooks/usePagination';
import useSearch from '@/hooks/useSearch';
import { ROUTE_PATHS } from '@/router';
import { getCharacters } from '@/services/rickAndMorty/rickAndMorty';
import { Character } from '@/services/rickAndMorty/types';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function HomePage() {
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
        render: ({ id, name }) => {
          const label = `${name} refrence link`;
          const to = ROUTE_PATHS.CHARACTER.DETAILS.replace(
            ':id',
            id.toString()
          );
          return (
            <Link aria-label={label} to={to}>
              {name} reference
            </Link>
          );
        },
      },
    ],
    []
  );

  return (
    <main>
      <h1>Rick and Morty App</h1>

      {isLoading ? (
        <p>Loading</p>
      ) : (
        <article className="flex flex-col gap-8">
          <header>
            <h1>Results ({meta?.count ?? 0})</h1>
            <label htmlFor="name-filter" />
            <input
              id="name-filter"
              name="name-filter"
              placeholder="Search for a character"
              className="bg-gray-800 w-80 rounded-xl px-4 py-2 text-sm text-gray-200 font-medium"
              onChange={handleSearchChange}
            />
          </header>

          <Table
            data={results}
            columns={columns}
            emptyText="There are no results"
          />
          <Pagination
            isCentered
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
