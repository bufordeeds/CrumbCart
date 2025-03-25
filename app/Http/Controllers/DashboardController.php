<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\WeeklyInventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the customer dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Get the user's recent orders
        $recentOrders = $user->orders()
            ->with('weeklyInventory.breadType')
            ->latest()
            ->take(5)
            ->get();

        // Get available bread for the current week
        $currentWeekInventory = WeeklyInventory::with('breadType')
            ->where('is_active', true)
            ->where('available_quantity', '>', 0)
            ->where('order_deadline', '>', now())
            ->get();

        return Inertia::render('Dashboard', [
            'recentOrders' => $recentOrders,
            'availableBread' => $currentWeekInventory,
        ]);
    }
}
