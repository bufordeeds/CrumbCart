<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WeeklyInventory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'bread_type_id',
        'available_quantity',
        'bake_date',
        'order_deadline',
        'week_number',
        'year',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'bake_date' => 'date',
        'order_deadline' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Get the bread type that owns the weekly inventory.
     */
    public function breadType(): BelongsTo
    {
        return $this->belongsTo(BreadType::class);
    }

    /**
     * Get the orders for the weekly inventory.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
