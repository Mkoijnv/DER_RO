<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rodovia;

class RodoviaSeeder extends Seeder
{
    public function run()
    {
        // IMPORTANTE: Rondônia sempre será ID 22
        $estado_id_rondonia = 22;
        
        // Verificar se o estado existe
        $rondonia = \App\Models\Estado::find($estado_id_rondonia);
        
        if (!$rondonia || $rondonia->sigla !== 'RO') {
            $this->command->error('Estado de Rondônia (ID 22) não encontrado! Execute o EstadoSeeder primeiro.');
            return;
        }

        $rodovias = [
            ['nome' => 'BR-364', 'estado_id' => 22],
            ['nome' => 'BR-421', 'estado_id' => 22],
            ['nome' => 'RO-010', 'estado_id' => 22],
            ['nome' => 'RO-135', 'estado_id' => 22],
            ['nome' => 'RO-370', 'estado_id' => 22],
            ['nome' => 'RO-491', 'estado_id' => 22],
            ['nome' => 'RO-492', 'estado_id' => 22],
        ];

        foreach ($rodovias as $rodovia) {
            Rodovia::create($rodovia);
        }
        
        $this->command->info('✅ 7 rodovias de Rondônia criadas com estado_id = 22');
    }
}
