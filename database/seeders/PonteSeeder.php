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
                'rodovia_id' => 1,
                'nome' => 'Ponte Rondon-Roosevelt',
                'rio' => 'Rio Madeira',
                'km' => 976.00,
                'latitude' => -8.7377497,
                'longitude' => -63.9223130,
                'material' => 'concreto',
                'situacao' => 'boa',
                'foto' => null
            ],
            [
                'rodovia_id' => 2,
                'nome' => 'Ponte do Abunã',
                'rio' => 'Rio Madeira',
                'km' => 60.50,
                'latitude' => -9.6660559,
                'longitude' => -65.4454925,
                'material' => 'concreto',
                'situacao' => 'boa',
                'foto' => null
            ],
            [
                'rodovia_id' => 3,
                'nome' => 'Ponte sobre o Rio Candeias',
                'rio' => 'Rio Candeias',
                'km' => 693.00,
                'latitude' => -8.7991914,
                'longitude' => -63.7171922,
                'material' => 'concreto',
                'situacao' => 'boa',
                'foto' => null
            ],
            [
                'rodovia_id' => 4,
                'nome' => 'Viaduto da Jatuarana',
                'rio' => 'Terrestre (sobreposição viária)',
                'km' => 0.00,
                'latitude' => -8.7778780,
                'longitude' => -63.8719981,
                'material' => 'concreto',
                'situacao' => 'boa',
                'foto' => null
            ],
            [
                'rodovia_id' => 5,
                'nome' => 'Viaduto do Trevo do Roque',
                'rio' => 'Terrestre (sobreposição viária)',
                'km' => 0.00,
                'latitude' => -8.7713176,
                'longitude' => -63.8831739,
                'material' => 'concreto',
                'situacao' => 'boa',
                'foto' => null
            ],
            [
                'rodovia_id' => 6,
                'nome' => 'Viaduto da Campos Sales',
                'rio' => 'Terrestre (sobreposição viária)',
                'km' => 0.00,
                'latitude' => -8.7842772,
                'longitude' => -63.8967911,
                'material' => 'concreto',
                'situacao' => 'boa',
                'foto' => null
            ],
            [
                'rodovia_id' => 7,
                'nome' => 'Alça de Acesso à Zona Sul',
                'rio' => 'Terrestre (acesso)',
                'km' => 0.00,
                'latitude' => -8.7850512,
                'longitude' => -63.8968769,
                'material' => 'concreto',
                'situacao' => 'boa',
                'foto' => null
            ],
            [
                'rodovia_id' => 8,
                'nome' => 'Ponte na Estrada do Areia Branca',
                'rio' => 'Igarapé Bate Estacas',
                'km' => 0.50,
                'latitude' => -8.7978228,
                'longitude' => -63.9014190,
                'material' => 'concreto',
                'situacao' => 'boa',
                'foto' => null
            ],
            [
                'rodovia_id' => 9,
                'nome' => 'Ponte na Rua 16 de Junho',
                'rio' => 'Igarapé Urbano',
                'km' => 0.10,
                'latitude' => -10.0000000,
                'longitude' => -64.0000000,
                'material' => 'concreto',
                'situacao' => 'boa',
                'foto' => null
            ],
            [
                'rodovia_id' => 10,
                'nome' => 'Desvio Duplo de Igarapé',
                'rio' => 'Igarapé',
                'km' => 0.20,
                'latitude' => -10.0000000,
                'longitude' => -64.0000000,
                'material' => 'concreto',
                'situacao' => 'boa',
                'foto' => null
            ],
            [
                'rodovia_id' => 11,
                'nome' => 'Pontes Ferroviárias (diversas) - EFMM',
                'rio' => 'Vários igarapés',
                'km' => 0.00,
                'latitude' => -10.0000000,
                'longitude' => -64.0000000,
                'material' => 'aço',
                'situacao' => 'interditada',
                'foto' => null
            ],
        ];

        foreach ($pontes as $ponte) {
            Ponte::create($ponte);
        }
        
        $this->command->info('✅ 11 pontes de Rondônia criadas com sucesso!');
    }
}
