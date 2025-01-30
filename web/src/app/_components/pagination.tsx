'use client';

export default function Pagination({ meta, per_page }: Readonly<any>) {
  const totalPages = Math.ceil(meta.total / meta.per_page);
  const nextPage = meta.current_page + 1;
  const prevPage = meta.current_page - 1;


  const currentQueryParams = new URLSearchParams(window.location.search);

  if (per_page) {
    currentQueryParams.set('per_page', per_page.toString());
  } else {
    currentQueryParams.delete('per_page');
  }

  const updateQueryParams = (newPage: number) => {
    currentQueryParams.set('page', newPage.toString());
    return `${window.location.pathname}?${currentQueryParams.toString()}`;
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {prevPage > 0 && (
          <a
            href={updateQueryParams(prevPage)}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Anterior
          </a>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          const isActive = page === meta.current_page;
          return (
            <a
              key={page}
              href={updateQueryParams(page)}
              className={`inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium ${isActive ? 'border-indigo-500 text-indigo-600' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
            >
              {page}
            </a>
          );
        })}
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        {nextPage <= totalPages && (
          <a
            href={updateQueryParams(nextPage)}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Próxima
          </a>
        )}
      </div>
    </nav>
  );
}
