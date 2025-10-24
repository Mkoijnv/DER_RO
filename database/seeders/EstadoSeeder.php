<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Estado;

class EstadoSeeder extends Seeder
{
    public function run()
    {
        // ORDEM ESPECÍFICA: Rondônia será ID 22
        $estados = [
            ['nome' => 'Acre', 'sigla' => 'AC'],                      // ID 1
            ['nome' => 'Alagoas', 'sigla' => 'AL'],                   // ID 2
            ['nome' => 'Amapá', 'sigla' => 'AP'],                     // ID 3
            ['nome' => 'Amazonas', 'sigla' => 'AM'],                  // ID 4
            ['nome' => 'Bahia', 'sigla' => 'BA'],                     // ID 5
            ['nome' => 'Ceará', 'sigla' => 'CE'],                     // ID 6
            ['nome' => 'Distrito Federal', 'sigla' => 'DF'],          // ID 7
            ['nome' => 'Espírito Santo', 'sigla' => 'ES'],            // ID 8
            ['nome' => 'Goiás', 'sigla' => 'GO'],                     // ID 9
            ['nome' => 'Maranhão', 'sigla' => 'MA'],                  // ID 10
            ['nome' => 'Mato Grosso', 'sigla' => 'MT'],               // ID 11
            ['nome' => 'Mato Grosso do Sul', 'sigla' => 'MS'],        // ID 12
            ['nome' => 'Minas Gerais', 'sigla' => 'MG'],              // ID 13
            ['nome' => 'Pará', 'sigla' => 'PA'],                      // ID 14
            ['nome' => 'Paraíba', 'sigla' => 'PB'],                   // ID 15
            ['nome' => 'Paraná', 'sigla' => 'PR'],                    // ID 16
            ['nome' => 'Pernambuco', 'sigla' => 'PE'],                // ID 17
            ['nome' => 'Piauí', 'sigla' => 'PI'],                     // ID 18
            ['nome' => 'Rio de Janeiro', 'sigla' => 'RJ'],            // ID 19
            ['nome' => 'Rio Grande do Norte', 'sigla' => 'RN'],       // ID 20
            ['nome' => 'Rio Grande do Sul', 'sigla' => 'RS'],         // ID 21
            ['nome' => 'Rondônia', 'sigla' => 'RO'],                  // ID 22 ⭐
            ['nome' => 'Roraima', 'sigla' => 'RR'],                   // ID 23
            ['nome' => 'Santa Catarina', 'sigla' => 'SC'],            // ID 24
            ['nome' => 'São Paulo', 'sigla' => 'SP'],                 // ID 25
            ['nome' => 'Sergipe', 'sigla' => 'SE'],                   // ID 26
            ['nome' => 'Tocantins', 'sigla' => 'TO'],                 // ID 27
        ];

        foreach ($estados as $estado) {
            Estado::create($estado);
        }
        
        $this->command->info('27 estados criados! Rondônia (RO) = ID 22');
    }
}
