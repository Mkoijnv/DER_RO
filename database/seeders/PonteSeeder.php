<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ponte;

class PonteSeeder extends Seeder
{
    public function run()
    {
        $pontes = [
            [
                'nome' => 'Ponte do Abunã',
                'rodovia_id' => 1,
                'rio' => 'Rio Abunã',
                'km' => 5.2,
                'latitude' => -10.95,
                'longitude' => -62.85,
                'material' => 'concreto',
                'situacao' => 'boa',
                'foto' => null
            ],
            [
                'nome' => 'Ponte sobre o Rio Urupá',
                'rodovia_id' => 3,
                'rio' => 'Rio Urupá',
                'km' => 3.7,
                'latitude' => -11.0,
                'longitude' => -62.9,
                'material' => 'aço',
                'situacao' => 'regular',
                'foto' => null
            ],
            [
                'nome' => 'Ponte sobre o Rio Jamari',
                'rodovia_id' => 2,
                'rio' => 'Rio Jamari',
                'km' => 4.1,
                'latitude' => -11.1,
                'longitude' => -62.95,
                'material' => 'misto',
                'situacao' => 'boa',
                'foto' => null
            ],
            [
                'nome' => 'Ponte sobre o Rio Pardo',
                'rodovia_id' => 3,
                'rio' => 'Rio Pardo',
                'km' => 6.5,
                'latitude' => -11.2,
                'longitude' => -62.88,
                'material' => 'madeira',
                'situacao' => 'ruim',
                'foto' => null
            ],
            [
                'nome' => 'Ponte sobre o Rio Madeira',
                'rodovia_id' => 1,
                'rio' => 'Rio Madeira',
                'km' => 8.3,
                'latitude' => -10.9,
                'longitude' => -63.0,
                'material' => 'concreto',
                'situacao' => 'boa',
                'foto' => null
            ],
        ];

        foreach ($pontes as $ponte) {
            Ponte::create($ponte);
        }
    }
}
