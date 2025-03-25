<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\WeeklyInventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        DB::transaction(function () use ($request, $validated, $weeklyInventory, $totalPrice) {
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
