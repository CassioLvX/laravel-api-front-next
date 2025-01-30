'use client'

import React, { Suspense,useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { deleteProduct, getAllProducts } from '@/app/services/requestService';
import { Meta, Product, ProductCollection } from '@/app/interfaces/productInterface';
import PercentageForm from '@/app/(dashboard)/_components/percentageForm';
import useProtectedRoute from '@/app/hooks/useProtectedRoute';
import Filters from '@/app/(dashboard)/_components/filters';
import Pagination from '@/app/_components/pagination';
import sliceString from '@/app/utils/sliceStrings';
import Link from 'next/link';


export default function ProductsList() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductCollection | null>(null);
  const [pagination, setPagination] = useState<Meta | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const allSelected = selectedProducts.length === products?.data.length;

  useProtectedRoute();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const min_price = searchParams.get('min_price') ?? null;
        const max_price = searchParams.get('max_price') ?? null;
        const page = searchParams.get('page') ?? '1';
        const per_page = searchParams.get('per_page') ?? '10';

        const data = await getAllProducts(page, per_page, { min_price, max_price });
        console.log(data);
        setProducts(data);
        setPagination(data.meta);
      } catch (err) {
        console.log('Erro ao carregar produtos.: ', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedProducts([]);
    } else if (!products) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.data.map((product) => product.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(String(id)) ? prev.filter((pid) => pid !== String(id)) : [...prev, String(id)]
    );
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-0 sm:px-0 lg:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="font-black text-gray-900">Products</h1>
        </div>
      </div>
      <div>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-1 items-end justify-start">
          <div className="flex md:col-span-5 lg:col-span-5 xl:col-span-4">
              <PercentageForm selectedIds={selectedProducts.map(id => id)} />
          </div>
          <div className="flex md:col-span-4 lg:col-span-4 justify-betwee">

              <Filters
                  min_price={searchParams.get("min_price")}
                  max_price={searchParams.get("max_price")}
                  maxPriceValue={pagination && pagination.price_range ? pagination.price_range.maxPriceValue : 0}
                  minPriceValue={pagination && pagination.price_range ? pagination.price_range.minPriceValue : 0}
              />
          </div>

          <div className="flex justify-end items-end col-start-10 md:col-span-1 w-full ml-auto ml-1">
            <Link href="/panel/products/create" className="bg-blue-600 text-white px-2 py-0 rounded hover:bg-blue-700 w-full md:w-auto">
              Create Product
            </Link>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Name
              </th>
              <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                Description
              </th>
              <th scope="col" className="relative sm:pr-0">
              <div className="flex justify-between items-center mb-1">
                Actions
              </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products?.data.map((product: Product) => (
              <tr key={product.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleSelectOne(product.id)}
                  />
                </td>
                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {sliceString(product.name, 30)}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {sliceString(product.description, 100)}
                </td>
                <td className="whitespace-nowrap text-right text-sm font-medium sm:pr-0">
                  <div className='grid grid-cols-1 md:grid-cols-3' >
                    <button
                      onClick={() => window.location.href = `../product/${product.id}`}
                      className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 m-1"
                    >
                      View
                    </button>
                    <button
                      onClick={() => window.location.href = `products/${product.id}`}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 m-1"
                    >
                      Edit
                    </button>
                    <button  onClick={() => handleDelete(product.id)}  type="submit"
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 m-1">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )) ?? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <Pagination meta={pagination} per_page={searchParams.get('per_page')} />
      )}
    </div>
  );
}
