<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Municipio;

class MunicipioSeeder extends Seeder
{
    public function run()
    {
        $municipios = [
            ['nome' => 'Porto Velho', 'estado_id' => 1],
            ['nome' => 'Ji-Paraná', 'estado_id' => 1],
            ['nome' => 'Ariquemes', 'estado_id' => 1],
            ['nome' => 'Vilhena', 'estado_id' => 1],
            ['nome' => 'Cacoal', 'estado_id' => 1],
            ['nome' => 'Rolim de Moura', 'estado_id' => 1],
            ['nome' => 'Pimenta Bueno', 'estado_id' => 1],
            ['nome' => 'Guajará-Mirim', 'estado_id' => 1],
            ['nome' => 'Ouro Preto do Oeste', 'estado_id' => 1],
            ['nome' => 'Candeias do Jamari', 'estado_id' => 1],
            ['nome' => 'Nova Mamoré', 'estado_id' => 1],
            ['nome' => 'Colorado do Oeste', 'estado_id' => 1],
            ['nome' => 'Cabixi', 'estado_id' => 1],
            ['nome' => 'Cerejeiras', 'estado_id' => 1],
            ['nome' => 'Corumbiara', 'estado_id' => 1],
            ['nome' => 'Pimenteiras do Oeste', 'estado_id' => 1],
            ['nome' => 'Alto Paraíso', 'estado_id' => 1],
            ['nome' => 'Buritis', 'estado_id' => 1],
            ['nome' => 'Monte Negro', 'estado_id' => 1],
            ['nome' => 'Cujubim', 'estado_id' => 1],
            ['nome' => 'Itapuã do Oeste', 'estado_id' => 1],
            ['nome' => 'Rio Crespo', 'estado_id' => 1],
            ['nome' => 'Ouro Preto do Oeste', 'estado_id' => 1],
            ['nome' => 'Mirante da Serra', 'estado_id' => 1],
            ['nome' => 'Nova União', 'estado_id' => 1],
            ['nome' => 'Teixeirópolis', 'estado_id' => 1],
            ['nome' => 'Urupá', 'estado_id' => 1],
            ['nome' => 'Vale do Paraíso', 'estado_id' => 1],
        ];

        foreach ($municipios as $municipio) {
            Municipio::create($municipio);
        }
    }
}
