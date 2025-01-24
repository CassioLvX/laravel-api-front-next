<?php

namespace App\Services\ProductService;

use App\Repositories\ProductRepository\ProductRepositoryInterface;

class ProductService implements ProductServiceInterface
{
    protected $productRepository;

    public function __construct(
        ProductRepositoryInterface $productRepository,
    ) {
        $this->productRepository = $productRepository;
    }


    public function getAllProductsWithFilters(array $filters)
    {
        return $this->productRepository->getAllProductsWithFilters($filters);
    }
}
