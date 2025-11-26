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
        Schema::table('proker_anggota', function (Blueprint $table) {
            if (!Schema::hasColumn('proker_anggota', 'division_id')) {
                $table->foreignId('division_id')->nullable()->constrained('divisions')->nullOnDelete()->after('user_id');
            }

            if (!Schema::hasColumn('proker_anggota', 'position_id')) {
                $table->foreignId('position_id')->nullable()->constrained('positions')->nullOnDelete()->after('division_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('proker_anggota', function (Blueprint $table) {
            if (Schema::hasColumn('proker_anggota', 'position_id')) {
                $table->dropForeign(['position_id']);
                $table->dropColumn('position_id');
            }

            if (Schema::hasColumn('proker_anggota', 'division_id')) {
                $table->dropForeign(['division_id']);
                $table->dropColumn('division_id');
            }
        });
    }
};
