import { ProductCollection } from "../interfaces/productInterface";
export default function getMinMaxValueHelper(productCollection: ProductCollection)
{
    const { price_range } = productCollection.meta;
    const { minPriceValue, maxPriceValue } = price_range;

    return {
        minPriceValue,
        maxPriceValue
     }
}