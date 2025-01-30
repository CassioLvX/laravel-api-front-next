<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Requests\UpdatePriceRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Jobs\updateProductsJob;
use App\Models\Product;
use App\Services\ProductService\ProductServiceInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{

    protected $productService;

    public function __construct(ProductServiceInterface $productService)
    {
        $this->productService = $productService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->only(['min_price', 'max_price', 'page', 'per_page']);

            $products = $this->productService->getAllProductsWithFilters($filters);

            return response()->json(new ProductCollection($products), Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error('Failed to retrieve products' . self::class, [
                'code' => 'failed_to_retrieve_products' . self::class,
                'exception' => $e,
            ]);
            return response()->json([
                'message'=>'Failed to retrieve products',
                'errorType' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        try {
            $data = $request->validated();

            $imgPath = $this->productService->uploadImage($request);

            if ($imgPath) {
                $data['image_path'] = $imgPath;
            }

            $this->productService->createNewProduct($data);

            return response()->json([
               'message'=>'Product created successfully',
            ], Response::HTTP_CREATED);
        } catch (Exception $e) {
            Log::error('Failed to create product' . self::class, [
                'code' => 'failed_to_create_product' . self::class,
                'exception' => $e,
            ]);
            return response()->json([
                'message'=>'Failed to create product',
                'errorType' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $product = $this->productService->getProductById($id);
            return response()->json(new ProductResource($product), Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error('Failed to get product' . self::class, [
                'code' => 'failed_to_get_product' . self::class,
                'exception' => $e,
            ]);
            return response()->json([
                'message'=>'Failed to get product',
                'errorType' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, string $id)
    {
        try {
            $data = $request->validated();

            $imgPath = $this->productService->uploadImage($request);

            if ($imgPath) {
                $data['image_path'] = $imgPath;
            }

            $this->productService->updateProduct($id, $data);

            return response()->json([
               'message'=>'Product updated successfully',
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error('Failed to update product' . self::class, [
                'code' => 'failed_to_update_product' . self::class,
                'exception' => $e,
            ]);
            return response()->json([
                'message'=>'Failed to update product',
                'errorType' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->productService->deleteProduct($id);
            return response()->json([
               'message'=>'Product deleted successfully',
            ], Response::HTTP_NO_CONTENT);
        } catch (Exception $e) {
            Log::error('Failed to delete product' . self::class, [
                'code' => 'failed_to_delete_product' . self::class,
                'exception' => $e,
            ]);
            return response()->json([
                'message'=>'Failed to delete product',
                'errorType' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updatePrice(UpdatePriceRequest $request)
    {
        try {
            $data = $request->validated();

            UpdateProductsJob::dispatch($data);

            return response()->json([
               'message'=>'Product prices updated successfully',
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error('Failed to update products price' . self::class, [
                'code' => 'failed_to_update_products_price' . self::class,
                'exception' => $e,
            ]);
            return response()->json([
                'message'=>'Failed to update products price',
                'errorType' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
