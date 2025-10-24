<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Municipio;

class MunicipioSeeder extends Seeder
{
    public function run()
    {
        // IMPORTANTE: Rondônia sempre será ID 22 (conforme EstadoSeeder)
        $estado_id_rondonia = 22;
        
        // Verificar se o estado existe
        $rondonia = \App\Models\Estado::find($estado_id_rondonia);
        
        if (!$rondonia) {
            $this->command->error('Estado de Rondônia (ID 22) não encontrado! Execute o EstadoSeeder primeiro.');
            return;
        }
        
        if ($rondonia->sigla !== 'RO') {
            $this->command->error("ERRO: ID 22 não é Rondônia! É {$rondonia->nome}. Recrie os estados na ordem correta.");
            return;
        }

        $municipios = [
            ['nome' => 'Porto Velho', 'estado_id' => 22],
            ['nome' => 'Ji-Paraná', 'estado_id' => 22],
            ['nome' => 'Ariquemes', 'estado_id' => 22],
            ['nome' => 'Vilhena', 'estado_id' => 22],
            ['nome' => 'Cacoal', 'estado_id' => 22],
            ['nome' => 'Rolim de Moura', 'estado_id' => 22],
            ['nome' => 'Pimenta Bueno', 'estado_id' => 22],
            ['nome' => 'Guajará-Mirim', 'estado_id' => 22],
            ['nome' => 'Ouro Preto do Oeste', 'estado_id' => 22],
            ['nome' => 'Candeias do Jamari', 'estado_id' => 22],
            ['nome' => 'Nova Mamoré', 'estado_id' => 22],
            ['nome' => 'Colorado do Oeste', 'estado_id' => 22],
            ['nome' => 'Cabixi', 'estado_id' => 22],
            ['nome' => 'Cerejeiras', 'estado_id' => 22],
            ['nome' => 'Corumbiara', 'estado_id' => 22],
            ['nome' => 'Pimenteiras do Oeste', 'estado_id' => 22],
            ['nome' => 'Alto Paraíso', 'estado_id' => 22],
            ['nome' => 'Buritis', 'estado_id' => 22],
            ['nome' => 'Monte Negro', 'estado_id' => 22],
            ['nome' => 'Cujubim', 'estado_id' => 22],
            ['nome' => 'Itapuã do Oeste', 'estado_id' => 22],
            ['nome' => 'Rio Crespo', 'estado_id' => 22],
            ['nome' => 'Mirante da Serra', 'estado_id' => 22],
            ['nome' => 'Nova União', 'estado_id' => 22],
            ['nome' => 'Teixeirópolis', 'estado_id' => 22],
            ['nome' => 'Urupá', 'estado_id' => 22],
            ['nome' => 'Vale do Paraíso', 'estado_id' => 22],
        ];

        foreach ($municipios as $municipio) {
            Municipio::create($municipio);
        }
        
        $this->command->info('✅ 27 municípios de Rondônia criados com estado_id = 22');
    }
}
