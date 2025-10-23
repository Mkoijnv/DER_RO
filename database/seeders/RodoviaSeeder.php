<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rodovia;

class RodoviaSeeder extends Seeder
{
    public function run()
    {
        $rodovias = [
            ['nome' => 'BR-364', 'estado_id' => 1],
            ['nome' => 'BR-421', 'estado_id' => 1],
            ['nome' => 'RO-010', 'estado_id' => 1],
            ['nome' => 'RO-135', 'estado_id' => 1],
            ['nome' => 'RO-370', 'estado_id' => 1],
            ['nome' => 'RO-491', 'estado_id' => 1],
            ['nome' => 'RO-492', 'estado_id' => 1],
        ];

        foreach ($rodovias as $rodovia) {
            Rodovia::create($rodovia);
        }
    }
}
