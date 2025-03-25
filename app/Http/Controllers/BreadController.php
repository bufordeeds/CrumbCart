<?php

namespace App\Http\Controllers;

use App\Models\BreadType;
use App\Models\WeeklyInventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BreadController extends Controller
{
    /**
     * Display a listing of available bread types.
     */
    public function index()
    {
        // Get all active bread types
        $breadTypes = BreadType::where('is_active', true)->get();

        // Get all active weekly inventory items with their bread types
        $weeklyInventory = WeeklyInventory::where('is_active', true)
            ->where('order_deadline', '>', now())
            ->with('breadType')
            ->get()
            ->map(function ($item) {
                // Add available_count for easier access in the frontend
                $item->available_count = $item->available_quantity;
                return $item;
            });

        return Inertia::render('Bread/Index', [
            'breadTypes' => $breadTypes,
            'weeklyInventory' => $weeklyInventory,
        ]);
    }

    /**
     * Display the specified bread type.
     */
    public function show(BreadType $breadType)
    {
        // Load the bread type with its current week inventory
        $breadType->load(['weeklyInventories' => function ($query) {
            $query->where('is_active', true)
                ->where('order_deadline', '>', now())
                ->where('available_quantity', '>', 0);
        }]);

        return Inertia::render('Bread/Show', [
            'breadType' => $breadType,
        ]);
    }
}
