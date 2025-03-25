<?php

namespace Database\Seeders;

use App\Models\BreadType;
use App\Models\WeeklyInventory;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class WeeklyInventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all bread types
        $breadTypes = BreadType::all();

        // Get current date and week information
        $now = Carbon::now();
        $currentWeek = $now->weekOfYear;
        $currentYear = $now->year;

        // Create inventory for the next 4 weeks
        for ($weekOffset = 0; $weekOffset < 4; $weekOffset++) {
            $weekNumber = $currentWeek + $weekOffset;
            $year = $currentYear;

            // Handle year rollover
            if ($weekNumber > 52) {
                $weekNumber = $weekNumber - 52;
                $year++;
            }

            // Calculate bake date (Friday of that week)
            $bakeDate = Carbon::now()->startOfWeek()->addDays(4 + ($weekOffset * 7));

            // Calculate order deadline (Wednesday of that week)
            $orderDeadline = Carbon::now()->startOfWeek()->addDays(2 + ($weekOffset * 7))->setTime(18, 0, 0);

            // Create inventory for each bread type
            foreach ($breadTypes as $breadType) {
                WeeklyInventory::create([
                    'bread_type_id' => $breadType->id,
                    'available_quantity' => rand(10, 30),
                    'bake_date' => $bakeDate,
                    'order_deadline' => $orderDeadline,
                    'week_number' => $weekNumber,
                    'year' => $year,
                    'is_active' => true,
                ]);
            }
        }
    }
}
