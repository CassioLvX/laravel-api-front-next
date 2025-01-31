import setupAxios  from '../lib/axios';
import { ProductCollection, Product } from '../interfaces/productInterface';

export const api = setupAxios();

export async function getAllProducts(
  page: string | undefined = '1',
  per_page: string | undefined = '10',
  filters: { min_price?: string | null; max_price?: string | null } = {},
  auth: boolean | null = false
): Promise<ProductCollection> {
  try {
    const params: Record<string, any> = { page, per_page, ...filters };
    const route = auth ? 'products' : 'product';
    const response = await api.get(`${route}`, { params });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw new Error('Erro ao buscar produtos');
  }
}

export async function getAllProductsOnAuth(
  page: string | undefined = '1',
  per_page: string | undefined = '10',
  filters: { min_price?: string | null; max_price?: string | null } = {},
): Promise<ProductCollection> {
  try {
    const params: Record<string, any> = { page, per_page, ...filters };

    const response = await api.get(`/products`, { params });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw new Error('Erro ao buscar produtos');
  }
}

export async function getProductsById(id: string): Promise<Product> {
    const response = await api.get(`/product/${id}`);
    return response.data;
}

export async function getProductsByIdOnAuth(id: string): Promise<Product> {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function deleteProduct(id: string): Promise<ProductCollection> {
    const response = await api.delete(`/products/${id}`);
    return response.data;
}

export async function createProduct(formData: any): Promise<any> {
  const response = await api.post('/products', formData,  {
    headers: {
      'Content-Type':'multipart/form-data'
    }
  });
  return response.data;
}

export async function updateProduct(id: string, formData: any): Promise<Product> {
  try {
    const response = await api.post(`/products/${id}`, formData, {
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to update product' + error);
  }
}

export async function sendPercentageData(formData: any): Promise<any> {
  try {
    const response = await api.put('/update-price', formData, {});
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar os dados:', error);
    throw error;
  }
}
