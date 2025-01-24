<?php

namespace App\Providers;

use App\Services\ProductService\ProductService;
use App\Services\ProductService\ProductServiceInterface;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;

class ProductServiceServiceProvider extends ServiceProvider implements DeferrableProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            ProductServiceInterface::class,
            ProductService::class,
         );
    }

    /**
     * Bootstrap services.
     */
    public function provides()
    {
        return [ProductServiceInterface::class];
    }
}
