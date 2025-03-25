<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BreadType;
use App\Models\WeeklyInventory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WeeklyInventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $weeklyInventories = WeeklyInventory::with('breadType')
            ->orderBy('year', 'desc')
            ->orderBy('week_number', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/WeeklyInventories/Index', [
            'weeklyInventories' => $weeklyInventories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $breadTypes = BreadType::where('is_active', true)
            ->orderBy('name')
            ->get();

        // Get current week information
        $now = Carbon::now();
        $currentWeek = $now->weekOfYear;
        $currentYear = $now->year;

        return Inertia::render('Admin/WeeklyInventories/Create', [
            'breadTypes' => $breadTypes,
            'currentWeek' => $currentWeek,
            'currentYear' => $currentYear,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'bread_type_id' => 'required|exists:bread_types,id',
            'available_quantity' => 'required|integer|min:1',
            'bake_date' => 'required|date|after_or_equal:today',
            'order_deadline' => 'required|date|before:bake_date',
            'week_number' => 'required|integer|min:1|max:53',
            'year' => 'required|integer|min:' . date('Y'),
            'is_active' => 'boolean',
        ]);

        // Set default is_active if not provided
        $validated['is_active'] = $validated['is_active'] ?? true;

        // Create the weekly inventory
        WeeklyInventory::create($validated);

        return redirect()->route('admin.weekly-inventories.index')
            ->with('success', 'Weekly inventory created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(WeeklyInventory $weeklyInventory)
    {
        $weeklyInventory->load(['breadType', 'orders.user']);

        return Inertia::render('Admin/WeeklyInventories/Show', [
            'weeklyInventory' => $weeklyInventory,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WeeklyInventory $weeklyInventory)
    {
        $breadTypes = BreadType::where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/WeeklyInventories/Edit', [
            'weeklyInventory' => $weeklyInventory,
            'breadTypes' => $breadTypes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WeeklyInventory $weeklyInventory)
    {
        $validated = $request->validate([
            'bread_type_id' => 'required|exists:bread_types,id',
            'available_quantity' => 'required|integer|min:0',
            'bake_date' => 'required|date',
            'order_deadline' => 'required|date|before:bake_date',
            'week_number' => 'required|integer|min:1|max:53',
            'year' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        // Update the weekly inventory
        $weeklyInventory->update($validated);

        return redirect()->route('admin.weekly-inventories.index')
            ->with('success', 'Weekly inventory updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WeeklyInventory $weeklyInventory)
    {
        // Check if the weekly inventory has any orders
        if ($weeklyInventory->orders()->exists()) {
            return back()->with('error', 'Cannot delete inventory with associated orders.');
        }

        // Delete the weekly inventory
        $weeklyInventory->delete();

        return redirect()->route('admin.weekly-inventories.index')
            ->with('success', 'Weekly inventory deleted successfully.');
    }
}
