<?php

namespace Database\Seeders;

use App\Models\BreadType;
use Illuminate\Database\Seeder;

class BreadTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $breadTypes = [
            [
                'name' => 'Classic Sourdough',
                'description' => 'Our traditional sourdough with a crispy crust and soft, tangy interior.',
                'price' => 7.99,
                'image_path' => 'images/breads/classic-sourdough.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Whole Wheat Sourdough',
                'description' => 'Hearty whole wheat sourdough with a nutty flavor and dense texture.',
                'price' => 8.99,
                'image_path' => 'images/breads/whole-wheat-sourdough.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Rosemary Garlic Sourdough',
                'description' => 'Aromatic sourdough infused with fresh rosemary and roasted garlic.',
                'price' => 9.99,
                'image_path' => 'images/breads/rosemary-garlic-sourdough.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Cinnamon Raisin Sourdough',
                'description' => 'Sweet sourdough with plump raisins and a hint of cinnamon.',
                'price' => 8.99,
                'image_path' => 'images/breads/cinnamon-raisin-sourdough.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Jalapeño Cheddar Sourdough',
                'description' => 'Spicy sourdough with jalapeños and sharp cheddar cheese throughout.',
                'price' => 10.99,
                'image_path' => 'images/breads/jalapeno-cheddar-sourdough.jpg',
                'is_active' => true,
            ],
        ];

        foreach ($breadTypes as $breadType) {
            BreadType::create($breadType);
        }
    }
}
