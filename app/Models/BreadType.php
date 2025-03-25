<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BreadType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'image_path',
        'is_active',
    ];

    /**
     * Get the weekly inventories for the bread type.
     */
    public function weeklyInventories(): HasMany
    {
        return $this->hasMany(WeeklyInventory::class);
    }
}
