<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class CreateAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::firstOrCreate(
            ['name' => 'admin'],
            ['description' => 'Administrator']
        );

        User::firstOrCreate(
            ['username' => 'roodiext'],
            [
                'name' => 'roodiext',
                'email' => 'roodiext@example.com',
                'password' => 'admin123',
                'role_id' => $role->id,
                'status' => 1,
            ]
        );
    }
}
