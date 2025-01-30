import { useState } from "react";
import { FiltersData } from "@/app/interfaces/filtersInterface";
import { useRouter } from 'next/navigation';

export default function FiltersProducts({
  min_price = '0',
  max_price = '0',
  maxPriceValue = 0,
  minPriceValue = 0,
}: Readonly<FiltersData>) {

  const [minPrice, setMinPrice] = useState(min_price);
  const [maxPrice, setMaxPrice] = useState(max_price);
  const router = useRouter();

  const handleSubmit =  (event: React.FormEvent) => {
    event.preventDefault();

    const query = new URLSearchParams();

    if (minPrice) query.set('min_price', minPrice);
    if (maxPrice) query.set('max_price', maxPrice);

    router.push(`/?${query.toString()}`);
  };

  const handleClear = () => {
    const currentQueryParams = new URLSearchParams(window.location.search);
    setMinPrice('0');
    setMaxPrice('0');

    currentQueryParams.delete('min_price');
    currentQueryParams.delete('max_price');

    router.push(`${window.location.pathname}?${currentQueryParams.toString()}`);
  };


  return (
    <aside>
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2"
    >
      <span>
        min price: <strong> {minPriceValue} </strong>
      </span>
      <input
        type="number"
        name="min_price"
        placeholder="Min Price"
        defaultValue={minPrice || ''}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border p-2 rounded w-full"
        step="any"
      />
      <span>
        max price: <strong> {maxPriceValue} </strong>
      </span>
      <input
        type="number"
        name="max_price"
        defaultValue={maxPrice || ''}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max Price"
        className="border p-2 rounded w-full"
        step="any"
      />
     <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 sm:col-span-2"
        >
          Buscar
        </button>
      <button
        type="button"
        onClick={handleClear}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 sm:col-span-2"
      >
        Clean
      </button>
    </form>
  </aside>
  
  );
}
