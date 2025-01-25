<?php

namespace App\Repositories\ProductRepository;

use App\Repositories\RepositoryInterface;

interface ProductRepositoryInterface extends RepositoryInterface
{
    public function getAllProductsWithFilters(array $filters);
    public function searchProductsWithFilters(array $filters);
}
