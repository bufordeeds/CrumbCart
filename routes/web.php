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

// Test email routes
Route::get('/test-email', function () {
    Illuminate\Support\Facades\Log::info('Test email route accessed');

    $order = App\Models\Order::with(['user', 'weeklyInventory.breadType'])->first();

    if (!$order) {
        Illuminate\Support\Facades\Log::warning('No orders found for test email');
        return 'No orders found to test with.';
    }

    Illuminate\Support\Facades\Log::info('Sending test email notification', [
        'order_id' => $order->id,
        'recipients' => ['bufordeeds8@gmail.com', 'casey.lizaso@gmail.com']
    ]);

    try {
        Illuminate\Support\Facades\Notification::route('mail', [
            'bufordeeds8@gmail.com' => 'Buford Eeds',
            'casey.lizaso@gmail.com' => 'Casey Lizaso'
        ])->notify(new App\Notifications\NewOrderNotification($order));

        Illuminate\Support\Facades\Log::info('Test email notification sent successfully');
        return 'Test email sent! Check your inbox.';
    } catch (\Exception $e) {
        Illuminate\Support\Facades\Log::error('Failed to send test email', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        return 'Failed to send test email: ' . $e->getMessage();
    }
});

// Test SendGrid Web API directly
Route::get('/test-sendgrid-api', function () {
    Illuminate\Support\Facades\Log::info('Test SendGrid Web API route accessed');

    try {
        // Send a test email using the Mail facade
        Illuminate\Support\Facades\Mail::to(['bufordeeds8@gmail.com'])
            ->send(new App\Mail\TestSendGridMail());

        Illuminate\Support\Facades\Log::info('Test email via SendGrid Web API sent successfully');
        return 'Test email sent via SendGrid Web API! Check your inbox.';
    } catch (\Exception $e) {
        Illuminate\Support\Facades\Log::error('Failed to send test email via SendGrid Web API', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        return 'Failed to send test email via SendGrid Web API: ' . $e->getMessage();
    }
});

// Test order notification directly
Route::get('/test-order-notification', function () {
    Illuminate\Support\Facades\Log::info('Test order notification route accessed');

    $order = App\Models\Order::with(['user', 'weeklyInventory.breadType'])->first();

    if (!$order) {
        Illuminate\Support\Facades\Log::warning('No orders found for test notification');
        return 'No orders found to test with.';
    }

    Illuminate\Support\Facades\Log::info('Sending test order notification', [
        'order_id' => $order->id,
        'recipients' => ['bufordeeds8@gmail.com']
    ]);

    try {
        // Send notification directly to a single recipient for testing
        Illuminate\Support\Facades\Notification::route('mail', [
            'bufordeeds8@gmail.com' => 'Buford Eeds'
        ])->notify(new App\Notifications\NewOrderNotification($order));

        Illuminate\Support\Facades\Log::info('Test order notification sent successfully');
        return 'Test order notification sent! Check your inbox.';
    } catch (\Exception $e) {
        Illuminate\Support\Facades\Log::error('Failed to send test order notification', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        return 'Failed to send test order notification: ' . $e->getMessage();
    }
});

// Test customer order confirmation email
Route::get('/test-order-confirmation', function () {
    Illuminate\Support\Facades\Log::info('Test order confirmation route accessed');

    $order = App\Models\Order::with(['user', 'weeklyInventory.breadType'])->first();

    if (!$order) {
        Illuminate\Support\Facades\Log::warning('No orders found for test confirmation');
        return 'No orders found to test with.';
    }

    Illuminate\Support\Facades\Log::info('Sending test order confirmation', [
        'order_id' => $order->id,
        'customer_email' => $order->user->email
    ]);

    try {
        // Send confirmation email to the customer
        Illuminate\Support\Facades\Mail::to([$order->user->email])
            ->send(new App\Mail\OrderConfirmationMail($order));

        Illuminate\Support\Facades\Log::info('Test order confirmation sent successfully');
        return 'Test order confirmation sent to customer! Check your inbox.';
    } catch (\Exception $e) {
        Illuminate\Support\Facades\Log::error('Failed to send test order confirmation', [
            'order_id' => $order->id,
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        return 'Failed to send test order confirmation: ' . $e->getMessage();
    }
});

// Test order notification using Mail facade
Route::get('/test-order-mail', function () {
    Illuminate\Support\Facades\Log::info('Test order mail route accessed');

    $order = App\Models\Order::with(['user', 'weeklyInventory.breadType'])->first();

    if (!$order) {
        Illuminate\Support\Facades\Log::warning('No orders found for test mail');
        return 'No orders found to test with.';
    }

    Illuminate\Support\Facades\Log::info('Sending test order mail', [
        'order_id' => $order->id,
        'recipient' => 'bufordeeds8@gmail.com'
    ]);

    try {
        // Create a simple HTML email with order details
        $breadType = $order->weeklyInventory->breadType->name;
        $quantity = $order->quantity;
        $totalPrice = '$' . number_format($order->total_price, 2);
        $pickupDate = $order->pickup_date->format('F j, Y');
        $customerName = $order->user->name;
        $customerEmail = $order->user->email;

        $html = "
            <h1>New Order Alert!</h1>
            <p>A new order has been placed by {$customerName} ({$customerEmail}).</p>
            <p><strong>Order Details:</strong></p>
            <ul>
                <li>Bread Type: {$breadType}</li>
                <li>Quantity: {$quantity}</li>
                <li>Total Price: {$totalPrice}</li>
                <li>Pickup Date: {$pickupDate}</li>
            </ul>
            <p>Thank you for using Crumb Cart!</p>
        ";

        // Send email using Mail facade
        Illuminate\Support\Facades\Mail::to(['bufordeeds8@gmail.com'])
            ->send(new class($html) extends Illuminate\Mail\Mailable {
                public $html;

                public function __construct($html) {
                    $this->html = $html;
                }

                public function build() {
                    return $this->from(config('mail.from.address'), config('mail.from.name'))
                        ->subject('Test Order Mail via SendGrid Web API')
                        ->html($this->html);
                }
            });

        Illuminate\Support\Facades\Log::info('Test order mail sent successfully');
        return 'Test order mail sent via SendGrid Web API! Check your inbox.';
    } catch (\Exception $e) {
        Illuminate\Support\Facades\Log::error('Failed to send test order mail', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        return 'Failed to send test order mail: ' . $e->getMessage();
    }
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
