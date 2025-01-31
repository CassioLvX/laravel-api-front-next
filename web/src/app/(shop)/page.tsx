'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filters from "../_components/filters";
import Pagination from "../_components/pagination";
import { getAllProducts } from "@/app/services/requestService";
import { ProductCollection } from "@/app/interfaces/productInterface";
import Products from "./_components/product";
import getMinMaxValueHelper from '../utils/getMinMaxValueHelper';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [productsData, setProductsData] = useState<ProductCollection | null>(null);
  const [minMaxValue, setMinMaxValue] = useState<any>(null);

  const fetchData = async () => {
    await fetch('/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'include',
    });
  }

  useEffect(() => {
    fetchData();
    const loadProducts = async () => {
      const min_price = searchParams.get('min_price') ?? null;
      const max_price = searchParams.get('max_price') ?? null;
      const page = searchParams.get('page') ?? '1';
      const per_page = searchParams.get('per_page') ?? '10';

      try {
        const data: ProductCollection = await getAllProducts(page, per_page, { min_price, max_price }, false);
        setProductsData(data);

        const minMax = getMinMaxValueHelper(data);

        setMinMaxValue(minMax);
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
      }
    };

    loadProducts();
  }, [searchParams]);

  if (!productsData || !minMaxValue) {
    return <div>Loading...</div>;
  }

  return (
      <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <Filters
            min_price={searchParams.get('min_price')}
            max_price={searchParams.get('max_price')}
            {...minMaxValue}
          />

          <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <h2 id="product-heading" className="sr-only">
              Products
            </h2>

            <Products products={productsData} />
        
            {productsData.meta.total > 0 && (
              <Pagination
                meta={productsData.meta}
                per_page={searchParams.get('per_page')}
              />
            )}
          </section>
        </div>
      </main>
  );
}
