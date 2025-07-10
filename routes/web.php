<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

// API routes for AJAX data loading
Route::prefix('api')->group(function () {
    Route::get('/sales-data', [DashboardController::class, 'getSalesData'])->name('api.sales-data');
    Route::get('/category-data', [DashboardController::class, 'getCategoryData'])->name('api.category-data');
    Route::get('/product-data', [DashboardController::class, 'getProductData'])->name('api.product-data');
});