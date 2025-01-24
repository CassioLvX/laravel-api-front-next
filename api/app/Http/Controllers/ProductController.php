<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService\ProductServiceInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
           return response()->json([
                'message'=>'Fail to get all itens',
                'errorType' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        try {
            $product = Product::find($id);
            return response()->json(new ProductResource($product), Response::HTTP_OK);
        } catch (Exception $e) {
           return response()->json([
                'message'=>'Fail to get all itens',
                'errorType' => $e->getMessage()
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
