<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use App\Models\WeeklyInventory;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all weekly inventories
        $weeklyInventories = WeeklyInventory::all();

        // Get or create some users
        $users = User::all();
        if ($users->count() < 3) {
            // Create some sample users if none exist
            $users = collect([
                User::factory()->create([
                    'name' => 'John Doe',
                    'email' => 'john@example.com',
                ]),
                User::factory()->create([
                    'name' => 'Jane Smith',
                    'email' => 'jane@example.com',
                ]),
                User::factory()->create([
                    'name' => 'Bob Johnson',
                    'email' => 'bob@example.com',
                ]),
            ]);
        }

        // Create some orders for each user
        foreach ($users as $user) {
            // Create 1-3 orders per user
            $orderCount = rand(1, 3);

            for ($i = 0; $i < $orderCount; $i++) {
                // Get a random weekly inventory
                $weeklyInventory = $weeklyInventories->random();

                // Calculate a random quantity between 1 and 3
                $quantity = rand(1, 3);

                // Calculate the total price
                $totalPrice = $weeklyInventory->breadType->price * $quantity;

                // Create the order
                Order::create([
                    'user_id' => $user->id,
                    'weekly_inventory_id' => $weeklyInventory->id,
                    'quantity' => $quantity,
                    'total_price' => $totalPrice,
                    'status' => rand(0, 3) > 0 ? 'pending' : 'confirmed', // 75% pending, 25% confirmed
                    'pickup_date' => $weeklyInventory->bake_date,
                    'notes' => rand(0, 1) ? 'Please slice the bread.' : null,
                ]);

                // Reduce the available quantity
                $weeklyInventory->available_quantity -= $quantity;
                $weeklyInventory->save();
            }
        }
    }
}
