import { getProductsByIdOnAuth } from '@/app/services/requestService';
import EditProduct from './EditProduct';
import { Product } from '@/app/interfaces/productInterface';


export type paramsType = Promise<{ id: string }>;

export default async function ProductDetails(props: { params: paramsType }) {
    const { id } = await props.params;

  const productData : Product = await getProductsByIdOnAuth(id);

  return <EditProduct initialProductDetails={productData} />;
}
