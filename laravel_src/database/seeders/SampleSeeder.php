<?php

namespace Database\Seeders;

use App\Models\Sample;
use Illuminate\Database\Seeder;

class SampleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $samples = [
            [
                'id' => 1,
                'message' => "sample 1"
            ],
            [
                'id' => 2,
                'message' => "sample 2"
            ],
            [
                'id' => 3,
                'message' => "sample 3"
            ],
        ];

        foreach ($samples as $sample) {
            Sample::insert($sample);
        }

    }
}
