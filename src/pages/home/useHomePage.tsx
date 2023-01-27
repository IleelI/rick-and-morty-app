import { TableColumns } from '@/components/table/table';
import usePagination, { INITIAL_PAGE } from '@/hooks/usePagination';
import useSearch from '@/hooks/useSearch';
import { ROUTE_PATHS } from '@/router';
import { getCharacters } from '@/services/rickAndMorty/rickAndMorty';
import { Character } from '@/services/rickAndMorty/types';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function useHomePage() {
  const pagination = usePagination();
  const { search, handleSearchChange } = useSearch({
    callback: () => pagination.setCurrentPage(INITIAL_PAGE),
  });
  const { data, isLoading, isFetching } = useQuery({
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
            <Link
              to={to}
              aria-label={label}
              className="underline underline-offset-4"
            >
              {name} reference
            </Link>
          );
        },
        disableSort: true,
      },
    ],
    []
  );

  return {
    columns,
    isLoading,
    isFetching,
    pagination,
    meta: data?.meta,
    data: data?.data ?? [],
    handleSearchChange,
  };
}
