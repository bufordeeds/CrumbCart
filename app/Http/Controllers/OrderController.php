<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\WeeklyInventory;
use App\Notifications\NewOrderNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the user's orders.
     */
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with('weeklyInventory.breadType')
            ->latest()
            ->get()
            ->map(function ($order) {
                // Transform order data for the frontend
                $breadType = $order->weeklyInventory->breadType;

                // Create items array for display in the order card
                $order->items = [
                    [
                        'bread_type' => $breadType,
                        'quantity' => $order->quantity,
                        'price' => $order->total_price,
                    ]
                ];

                return $order;
            });

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        // Ensure the user can only view their own orders
        $this->authorize('view', $order);

        $order->load('weeklyInventory.breadType');

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'weekly_inventory_id' => 'required|exists:weekly_inventories,id',
            'quantity' => 'required|integer|min:1',
            'pickup_date' => 'required|date|after_or_equal:today',
            'notes' => 'nullable|string|max:500',
        ]);

        // Get the weekly inventory
        $weeklyInventory = WeeklyInventory::findOrFail($validated['weekly_inventory_id']);

        // Check if the order deadline has passed
        if ($weeklyInventory->order_deadline < now()) {
            return back()->with('error', 'The order deadline has passed for this bread.');
        }

        // Check if there's enough inventory
        if ($weeklyInventory->available_quantity < $validated['quantity']) {
            return back()->with('error', 'Not enough inventory available.');
        }

        // Calculate the total price
        $totalPrice = $weeklyInventory->breadType->price * $validated['quantity'];

        // Create the order within a transaction
        $order = null;
        DB::transaction(function () use ($request, $validated, $weeklyInventory, $totalPrice, &$order) {
            // Create the order
            $order = $request->user()->orders()->create([
                'weekly_inventory_id' => $validated['weekly_inventory_id'],
                'quantity' => $validated['quantity'],
                'total_price' => $totalPrice,
                'status' => 'pending',
                'pickup_date' => $validated['pickup_date'],
                'notes' => $validated['notes'] ?? null,
            ]);

            // Update the available quantity
            $weeklyInventory->decrement('available_quantity', $validated['quantity']);
        });

        // Send emails about the new order
        if ($order) {
            // 1. Send notification to admins
            Log::info('Sending order notification to admins', [
                'order_id' => $order->id,
                'user_id' => $order->user_id,
                'total_price' => $order->total_price,
                'recipients' => ['bufordeeds8@gmail.com', 'casey.lizaso@gmail.com']
            ]);

            try {
                // Create a simple HTML email with order details for admins
                $breadType = $order->weeklyInventory->breadType->name;
                $quantity = $order->quantity;
                $totalPrice = '$' . number_format($order->total_price, 2);
                $pickupDate = $order->pickup_date->format('F j, Y');
                $customerName = $order->user->name;
                $customerEmail = $order->user->email;
                $orderUrl = url('/admin/orders/' . $order->id);

                $adminHtml = "
                    <h1>New Order Alert!</h1>
                    <p>A new order has been placed by {$customerName} ({$customerEmail}).</p>
                    <p><strong>Order Details:</strong></p>
                    <ul>
                        <li>Bread Type: {$breadType}</li>
                        <li>Quantity: {$quantity}</li>
                        <li>Total Price: {$totalPrice}</li>
                        <li>Pickup Date: {$pickupDate}</li>
                        " . ($order->notes ? "<li>Notes: {$order->notes}</li>" : "") . "
                    </ul>
                    <p><a href='{$orderUrl}'>View Order Details</a></p>
                    <p>Thank you for using Crumb Cart!</p>
                ";

                // Send admin notification email
                \Illuminate\Support\Facades\Mail::to(['bufordeeds8@gmail.com', 'casey.lizaso@gmail.com'])
                    ->send(new class($adminHtml, $order->id) extends \Illuminate\Mail\Mailable {
                    public $html;
                    public $orderId;

                    public function __construct($html, $orderId) {
                        $this->html = $html;
                        $this->orderId = $orderId;
                    }

                    public function build() {
                        return $this->from(config('mail.from.address'), config('mail.from.name'))
                            ->subject('New Order Placed - #' . $this->orderId)
                            ->html($this->html);
                    }
                });

                Log::info('Admin notification email sent successfully', [
                    'order_id' => $order->id
                ]);

                // 2. Send confirmation email to customer
                Log::info('Sending order confirmation to customer', [
                    'order_id' => $order->id,
                    'customer_email' => $order->user->email
                ]);

                // Send customer confirmation email
                \Illuminate\Support\Facades\Mail::to([$order->user->email])
                    ->send(new \App\Mail\OrderConfirmationMail($order));

                Log::info('Customer confirmation email sent successfully', [
                    'order_id' => $order->id,
                    'customer_email' => $order->user->email
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to send order emails', [
                    'order_id' => $order->id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
            }
        }

        return redirect()->route('orders.index')->with('success', 'Order placed successfully!');
    }

    /**
     * Remove the specified order from storage.
     */
    public function destroy(Order $order)
    {
        // Ensure the user can only cancel their own orders
        $this->authorize('delete', $order);

        // Check if the order can be cancelled (only pending orders)
        if ($order->status !== 'pending') {
            return back()->with('error', 'Only pending orders can be cancelled.');
        }

        // Cancel the order within a transaction
        DB::transaction(function () use ($order) {
            // Get the weekly inventory
            $weeklyInventory = $order->weeklyInventory;

            // Update the available quantity
            $weeklyInventory->increment('available_quantity', $order->quantity);

            // Update the order status
            $order->update(['status' => 'cancelled']);
        });

        return redirect()->route('orders.index')->with('success', 'Order cancelled successfully!');
    }
}
