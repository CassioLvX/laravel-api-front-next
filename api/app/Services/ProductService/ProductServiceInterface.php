<?php

namespace App\Services\ProductService;

interface ProductServiceInterface
{
    public function getAllProductsWithFilters(array $filters);
}
