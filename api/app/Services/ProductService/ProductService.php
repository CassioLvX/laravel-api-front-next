<?php

namespace App\Services\ProductService;

use App\Http\Requests\ProductRequest;
use App\Notifications\EmailNotify;
use App\Repositories\ProductRepository\ProductRepositoryInterface;
use Auth;
use Illuminate\Support\Facades\Log;

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

    public function createNewProduct(array $productData)
    {
        return $this->productRepository->save($productData);
    }

    public function updateProduct(string $id, array $data)
    {
        return $this->productRepository->update($id, $data);
    }

    public function deleteProduct(string $id)
    {
        return $this->productRepository->delete($id);
    }
    public function getProductById(string $id)
    {
        return $this->productRepository->getById($id);
    }

    public function searchProductsWithFilters(array $filters)
    {
        return $this->productRepository->searchProductsWithFilters($filters);
    }
    public function updateProductsByJob(array $productsData)
    {
        foreach ($productsData['ids'] as $id) {
            $dataPrepared = $this->prepareData($id, $productsData);
            $this->updateProduct($id, $dataPrepared);
            Auth::user()->notify(new EmailNotify([$id]));
            Log::channel('updated')->info('Product updated: '. $id);
        }
    }

    public function uploadImage(ProductRequest $request): string | bool
    {
        if (! $request->hasFile('image_path')) {
            return false;
        }

        $image = $request->file('image_path');
        $imageName = 'test' . time() . '.' . $image->getClientOriginalExtension();
        $imagePath = 'uploads';
        $image->move(public_path($imagePath), $imageName);

        return 'http://' . $_SERVER['HTTP_HOST'] . '/' . $imagePath . '/' . $imageName;
    }

    private function prepareData(string $id, array $data)
    {
        $product = $this->productRepository->getById($id);
        $productPrice = data_get($product, 'price');
        $modify = data_get($data, 'modify');
        $percentage =data_get($data, 'percent');

        $newPrice = match ($modify) {
            'positive' => $productPrice + $productPrice * ($percentage / 100),
            'negative' => $productPrice - $productPrice * ($percentage / 100),
            default => Log::error('Invalid value for modify. Use "positive" or "negative".'),
        };

        return ['price' => $newPrice];
    }
}
