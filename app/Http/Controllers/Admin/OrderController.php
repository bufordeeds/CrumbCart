<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
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
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Order::with(['user', 'weeklyInventory.breadType']);

        // Filter by status if provided
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Get the orders
        $orders = $query->latest()->paginate(10);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => [
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::orderBy('name')->get();
        $weeklyInventories = WeeklyInventory::with('breadType')
            ->where('is_active', true)
            ->where('order_deadline', '>', now())
            ->where('available_quantity', '>', 0)
            ->get();

        return Inertia::render('Admin/Orders/Create', [
            'users' => $users,
            'weeklyInventories' => $weeklyInventories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'weekly_inventory_id' => 'required|exists:weekly_inventories,id',
            'quantity' => 'required|integer|min:1',
            'pickup_date' => 'required|date|after_or_equal:today',
            'notes' => 'nullable|string|max:500',
        ]);

        // Get the weekly inventory
        $weeklyInventory = WeeklyInventory::findOrFail($validated['weekly_inventory_id']);

        // Check if there's enough inventory
        if ($weeklyInventory->available_quantity < $validated['quantity']) {
            return back()->with('error', 'Not enough inventory available.');
        }

        // Calculate the total price
        $totalPrice = $weeklyInventory->breadType->price * $validated['quantity'];

        // Create the order within a transaction
        $order = null;
        DB::transaction(function () use ($validated, $weeklyInventory, $totalPrice, &$order) {
            // Create the order
            $order = Order::create([
                'user_id' => $validated['user_id'],
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

        // Send notification about the new order
        if ($order) {
            Log::info('Sending order notification from AdminOrderController', [
                'order_id' => $order->id,
                'user_id' => $order->user_id,
                'total_price' => $order->total_price,
                'recipients' => ['bufordeeds8@gmail.com', 'casey.lizaso@gmail.com']
            ]);

            try {
                Notification::route('mail', [
                    'bufordeeds8@gmail.com' => 'Buford Eeds',
                    'casey.lizaso@gmail.com' => 'Casey Lizaso'
                ])->notify(new NewOrderNotification($order));

                Log::info('Order notification sent successfully from admin', [
                    'order_id' => $order->id
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to send order notification from admin', [
                    'order_id' => $order->id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
            }
        }

        return redirect()->route('admin.orders.index')
            ->with('success', 'Order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['user', 'weeklyInventory.breadType']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $order->load(['user', 'weeklyInventory.breadType']);

        $users = User::orderBy('name')->get();
        $weeklyInventories = WeeklyInventory::with('breadType')
            ->where('is_active', true)
            ->get();

        return Inertia::render('Admin/Orders/Edit', [
            'order' => $order,
            'users' => $users,
            'weeklyInventories' => $weeklyInventories,
            'statuses' => ['pending', 'confirmed', 'completed', 'cancelled'],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled',
            'pickup_date' => 'required|date',
            'notes' => 'nullable|string|max:500',
        ]);

        // Check if the status is changing
        $statusChanged = $order->status !== $validated['status'];
        $oldStatus = $order->status;

        // Update the order within a transaction
        DB::transaction(function () use ($order, $validated, $statusChanged, $oldStatus) {
            // Update the order
            $order->update($validated);

            // If the status is changing to or from cancelled, update the inventory
            if ($statusChanged) {
                $weeklyInventory = $order->weeklyInventory;

                if ($oldStatus === 'cancelled' && $validated['status'] !== 'cancelled') {
                    // Order is being un-cancelled, decrease inventory
                    $weeklyInventory->decrement('available_quantity', $order->quantity);
                } elseif ($oldStatus !== 'cancelled' && $validated['status'] === 'cancelled') {
                    // Order is being cancelled, increase inventory
                    $weeklyInventory->increment('available_quantity', $order->quantity);
                }
            }
        });

        return redirect()->route('admin.orders.index')
            ->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        // Only allow deletion of cancelled orders
        if ($order->status !== 'cancelled') {
            return back()->with('error', 'Only cancelled orders can be deleted.');
        }

        // Delete the order
        $order->delete();

        return redirect()->route('admin.orders.index')
            ->with('success', 'Order deleted successfully.');
    }
}
