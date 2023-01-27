import Pagination from '@/components/pagination/pagination';
import Table from '@/components/table/table';
import HomeToolbar from './components/home-toolbar/home-toolbar';
import useHomePage from './useHomePage';

export default function HomePage() {
  const {
    meta,
    data,
    columns,
    pagination,
    isLoading,
    isFetching,
    handleSearchChange,
  } = useHomePage();

  return (
    <main className="flex flex-col gap-2">
      <h1 className="text-3xl text-gray-50 font-semibold">
        Rick and Morty App
      </h1>

      {isLoading ? (
        <p>Loading</p>
      ) : (
        <article className="flex flex-col gap-8">
          <HomeToolbar
            isFetching={isFetching}
            count={meta?.count ?? 0}
            handleSearchChange={handleSearchChange}
          />
          <Table
            data={data}
            columns={columns}
            emptyText="There are no results"
            containerClasses="max-h-[640px]"
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
