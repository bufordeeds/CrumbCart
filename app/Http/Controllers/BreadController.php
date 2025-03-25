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
        // Get all active bread types with their current week inventory
        $breadTypes = BreadType::where('is_active', true)
            ->with(['weeklyInventories' => function ($query) {
                $query->where('is_active', true)
                    ->where('order_deadline', '>', now())
                    ->where('available_quantity', '>', 0);
            }])
            ->get();

        return Inertia::render('Bread/Index', [
            'breadTypes' => $breadTypes,
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
