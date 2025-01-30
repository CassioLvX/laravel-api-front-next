<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [UserController::class, 'login'])->name('login');

//Public
Route::get('/product', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show']);

//Protected
Route::get('/user', [UserController::class, 'getUser'])->middleware('auth:sanctum');
Route::put('/update-price', [ProductController::class, 'updatePrice'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::post('/', [ProductController::class, 'store']);
    /* o Verbo HTTP PUT não recebe multiform/data no Laravel, tem um bug canonico */
    Route::post('/{id}', [ProductController::class, 'update']);
    Route::delete('/{id}', [ProductController::class, 'destroy']);
});
