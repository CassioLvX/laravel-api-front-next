<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(ProductSeeder::class);

       User::factory()->create([
            'name' => 'Test User',
            'email' => env(EMAIL_TO_RECEIVE_NOTIFICATIONS),
            'password' => bcrypt('password'), // Hash::make('password')
        ]);
    }
}
