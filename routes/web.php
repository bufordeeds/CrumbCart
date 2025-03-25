<?php

use App\Http\Controllers\Admin\BreadTypeController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\WeeklyInventoryController;
use App\Http\Controllers\BreadController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Models\BreadType;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'breadTypes' => BreadType::where('is_active', true)->get(),
    ]);
});

// Customer routes (authenticated)
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Bread catalog
    Route::get('/bread', [BreadController::class, 'index'])->name('bread.index');
    Route::get('/bread/{breadType}', [BreadController::class, 'show'])->name('bread.show');

    // Orders
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::delete('/orders/{order}', [OrderController::class, 'destroy'])->name('orders.destroy');

    // Profile
    Route::get('/profile', function () {
        return Inertia::render('Profile/Index', [
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    })->name('profile.index');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Admin Dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Bread Types Management
    Route::resource('bread-types', BreadTypeController::class);

    // Weekly Inventory Management
    Route::resource('weekly-inventories', WeeklyInventoryController::class);

    // Order Management
    Route::resource('orders', AdminOrderController::class);
});

require __DIR__.'/auth.php';
