import { getProductsById } from "../../../services/requestService";
import { Product } from '../../../interfaces/productInterface';
import { Suspense } from "react";

export type paramsType = Promise<{ id: string }>;

export default async function ProductPage(props: { params: paramsType }) {
    const { id } = await props.params;

    if (!id) {
        return <div>Product not found</div>;
    }

    const productDetails: Product = await getProductsById( id );

return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">

            <div className="lg:max-w-lg lg:self-end">
                <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{productDetails.name}</h1>
                </div>

                <section aria-labelledby="information-heading" className="mt-4">
                    <h2 id="information-heading" className="sr-only">
                        Product information
                    </h2>

                    <div className="flex items-center">
                        <p className="text-lg text-gray-900 sm:text-xl">{productDetails.price}</p>
                    </div>

                    <div className="mt-4 space-y-6">
                        <p className="text-base text-gray-500">{productDetails.description}</p>
                    </div>

                </section>
            </div>

            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                <img alt={productDetails.description} src={productDetails.image_path} className="aspect-square w-full rounded-lg object-cover" />
            </div>

            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                <section aria-labelledby="options-heading">
                <h2 id="options-heading" className="sr-only">
                    Product options
                </h2>
                </section>
            </div>
        </div>
    </div>
    </Suspense>
    )
}
