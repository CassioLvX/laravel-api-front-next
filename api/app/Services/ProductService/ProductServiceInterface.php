<?php

namespace App\Services\ProductService;

use App\Http\Requests\ProductRequest;

interface ProductServiceInterface
{
    public function getAllProductsWithFilters(array $filters);
    public function createNewProduct(array $productData);
    public function updateProduct(string $id, array $data);
    public function deleteProduct(string $id);
    public function getProductById(string $id);
    public function searchProductsWithFilters(array $filters);
    public function updateProductsByJob(array $productsData);
    public function uploadImage(ProductRequest $request): string | bool;
}
