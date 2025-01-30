import { useState, useEffect } from 'react';
import { Product, ProductCollection } from '../../interfaces/productInterface';
import sliceString from '@/app/utils/sliceStrings';
import Link from "next/link";

export default function ProductsShow({ products }: Readonly<{ products: ProductCollection }>) {
  const [productsData, setProductsData] = useState<ProductCollection>(products);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
      {productsData.data.map((product: Product) => (
        <div
          key={product.id}
          className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <img
            alt={product.description}
            src={product.image_path}
            className="aspect-[3/4] bg-gray-200 object-cover group-hover:opacity-75 sm:h-96"
          />
          <div className="flex flex-1 flex-col space-y-2 p-4">
            <h3 className="text-sm font-medium text-gray-900">
              <Link href={`product/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-500">{sliceString(product.description)}</p>
            <div className="flex flex-1 flex-col justify-end">
              <p className="text-base font-medium text-gray-900"><strong>R$ {product.price}</strong></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
