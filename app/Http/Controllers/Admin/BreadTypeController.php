<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BreadType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BreadTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $breadTypes = BreadType::orderBy('name')->paginate(10);

        return Inertia::render('Admin/BreadTypes/Index', [
            'breadTypes' => $breadTypes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/BreadTypes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:bread_types',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/images/breads');
            $validated['image_path'] = Storage::url($path);
        }

        // Set default is_active if not provided
        $validated['is_active'] = $validated['is_active'] ?? true;

        // Create the bread type
        BreadType::create($validated);

        return redirect()->route('admin.bread-types.index')
            ->with('success', 'Bread type created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BreadType $breadType)
    {
        $breadType->load('weeklyInventories');

        return Inertia::render('Admin/BreadTypes/Show', [
            'breadType' => $breadType,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BreadType $breadType)
    {
        return Inertia::render('Admin/BreadTypes/Edit', [
            'breadType' => $breadType,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BreadType $breadType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:bread_types,name,' . $breadType->id,
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($breadType->image_path) {
                $oldPath = str_replace('/storage', 'public', $breadType->image_path);
                Storage::delete($oldPath);
            }

            $path = $request->file('image')->store('public/images/breads');
            $validated['image_path'] = Storage::url($path);
        }

        // Update the bread type
        $breadType->update($validated);

        return redirect()->route('admin.bread-types.index')
            ->with('success', 'Bread type updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BreadType $breadType)
    {
        // Check if the bread type has any weekly inventories
        if ($breadType->weeklyInventories()->exists()) {
            return back()->with('error', 'Cannot delete bread type with associated inventory.');
        }

        // Delete the image if it exists
        if ($breadType->image_path) {
            $path = str_replace('/storage', 'public', $breadType->image_path);
            Storage::delete($path);
        }

        // Delete the bread type
        $breadType->delete();

        return redirect()->route('admin.bread-types.index')
            ->with('success', 'Bread type deleted successfully.');
    }
}
