<?php

namespace App\Repositories\ProductRepository;

use App\Http\Resources\PriceRangeResource;
use App\Models\Product;
use App\Repositories\Repository;
use Exception;
use Illuminate\Support\Facades\Log;

class ProductRepository extends Repository implements ProductRepositoryInterface
{
    protected $model;

    public function __construct(Product $product)
    {
        $this->model = $product;
    }

    public function getAllProductsWithFilters(array $filters)
    {
        try {
            $query = Product::query();

            if (!empty($filters['min_price'])) {
                $query->where('price', '>=', $filters['min_price']);
            }

            if (!empty($filters['max_price'])) {
                $query->where('price', '<=', $filters['max_price']);
            }

            $perPage = !empty($filters['per_page']) ? $filters['per_page'] : 10;

            $_SESSION['MinPrice'] = $query->min('price');
            $_SESSION['MaxPrice'] = $query->max('price');

            return $query->paginate($perPage)->withQueryString();
        } catch (Exception $e) {
            Log::error($e->getMessage());
            throw $e;
        }
    }

    public function searchProductsWithFilters(array $filters)
    {
        try {
            $query = Product::query();

            if (!empty($filters['search'])) {
                $query->where('name', 'LIKE', "%{$filters['search']}%");
            }

            if (!empty($filters['min_price'])) {
                $query->where('price', '>=', $filters['min_price']);
            }

            if (!empty($filters['max_price'])) {
                $query->where('price', '<=', $filters['max_price']);
            }

            $perPage = !empty($filters['per_page']) ? $filters['per_page'] : 10;

            return $query->paginate($perPage)->withQueryString();
        } catch (Exception $e) {
            Log::error($e->getMessage());
            throw $e;
        }
    }
}

