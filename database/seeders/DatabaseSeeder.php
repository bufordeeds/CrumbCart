<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a test admin user
        User::factory()->create([
            'name' => 'Buford',
            'email' => 'admin@crumbcart.com',
            'is_admin' => true,
        ]);

        // Run the bread type seeder
        $this->call(BreadTypeSeeder::class);

        // Run the weekly inventory seeder
        $this->call(WeeklyInventorySeeder::class);

        // Run the order seeder
        $this->call(OrderSeeder::class);
    }
}
