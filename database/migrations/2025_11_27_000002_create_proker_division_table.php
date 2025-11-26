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
        Schema::create('proker_division', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proker_id')->constrained('prokers')->cascadeOnDelete();
            $table->foreignId('division_id')->constrained('divisions')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['proker_id','division_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proker_division');
    }
};
