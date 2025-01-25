<?php

namespace App\Jobs;

use App\Services\ProductService\ProductServiceInterface;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateProductsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $productsData;
    /**
     * Create a new job instance.
     */
    public function __construct(array $productsData)
    {
        $this->productsData = $productsData;
    }

    /**
     * Execute the job.
     */
    public function handle(ProductServiceInterface $productService): void
    {
        DB::beginTransaction();
        try {
            $productService->updateProductsByJob($this->productsData);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
        }
    }

}
