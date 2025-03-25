<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('weekly_inventories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bread_type_id')->constrained()->onDelete('cascade');
            $table->integer('available_quantity');
            $table->date('bake_date');
            $table->dateTime('order_deadline');
            $table->integer('week_number');
            $table->integer('year');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weekly_inventories');
    }
};
