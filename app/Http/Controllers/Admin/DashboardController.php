<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BreadType;
use App\Models\Order;
use App\Models\User;
use App\Models\WeeklyInventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        // Get counts for dashboard stats
        $stats = [
            'totalUsers' => User::count(),
            'totalBreadTypes' => BreadType::count(),
            'activeInventory' => WeeklyInventory::where('is_active', true)->count(),
            'pendingOrders' => Order::where('status', 'pending')->count(),
        ];

        // Get recent orders
        $recentOrders = Order::with(['user', 'weeklyInventory.breadType'])
            ->latest()
            ->take(5)
            ->get();

        // Get low inventory items
        $lowInventory = WeeklyInventory::with('breadType')
            ->where('is_active', true)
            ->where('available_quantity', '<', 5)
            ->where('order_deadline', '>', now())
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'lowInventory' => $lowInventory,
        ]);
    }
}
