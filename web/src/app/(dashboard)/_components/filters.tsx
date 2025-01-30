import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { FiltersData } from "@/app/interfaces/filtersInterface";

export default function FiltersProducts({
  min_price = '0',
  max_price = '0',
  maxPriceValue = 0,
  minPriceValue = 0,
}: Readonly<FiltersData>) {

  const [minPrice, setMinPrice] = useState(min_price);
  const [maxPrice, setMaxPrice] = useState(max_price);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      setMinPrice(searchParams.get('min_price') || min_price);
      setMaxPrice(searchParams.get('max_price') || max_price);
    }
  }, [searchParams, min_price, max_price]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const query = new URLSearchParams();
    if (minPrice && minPrice !== '0') query.set('min_price', minPrice);
    if (maxPrice && maxPrice !== '0') query.set('max_price', maxPrice);

    router.push(`/panel/products/?${query.toString()}`);
  };

  const handleClear = () => {
    const currentQueryParams = new URLSearchParams(searchParams.toString());
    currentQueryParams.delete('min_price');
    currentQueryParams.delete('max_price');

    setMinPrice('');
    setMaxPrice('');

    router.push(`/panel/products/?${currentQueryParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-4 w-full">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Min Price: <strong>{minPriceValue}</strong>
        </label>
        <input
          type="number"
          name="min_price"
          placeholder="Min Price"
          value={minPrice || ''}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-0 rounded w-full"
          step="any"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Max Price: <strong>{maxPriceValue}</strong>
        </label>
        <input
          type="number"
          name="max_price"
          value={maxPrice || ''}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
          className="border p-0 rounded w-full"
          step="any"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-2 py-0 rounded hover:bg-blue-700"
      >
        Buscar
      </button>

      <button
        type="button"
        onClick={handleClear}
        className="bg-gray-600 text-white px-2 py-0 rounded hover:bg-gray-700"
      >
        Clean
      </button>
    </form>
  );
}

