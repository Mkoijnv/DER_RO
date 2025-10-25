<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rodovia;

class RodoviaSeeder extends Seeder
{
    public function run()
    {
        $rodovias = [
            [
                'nome' => 'BR-319',
                'trecho_inicial' => 'Porto Velho (RO)',
                'trecho_final' => 'Humaitá (AM) / fronteira Norte',
                'extensao_km' => 975.00,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'BR-364',
                'trecho_inicial' => 'Entrocamento com BR-429 (sul/RO)',
                'trecho_final' => 'Entrocamento com BR-319 (Porto Velho)',
                'extensao_km' => 686.70,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'RO-133',
                'trecho_inicial' => 'Ouro Preto do Oeste',
                'trecho_final' => 'Distrito de Rondominas',
                'extensao_km' => 45.30,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'BR-364 (Av. Jatuarana)',
                'trecho_inicial' => 'BR-364 entroncamento',
                'trecho_final' => 'Av. Jatuarana - Porto Velho',
                'extensao_km' => 2.50,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'BR-364 (Trevo do Roque)',
                'trecho_inicial' => 'Trevo do Roque',
                'trecho_final' => 'Trevo do Roque - arredores',
                'extensao_km' => 1.20,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'BR-364 (Rua Campos Sales)',
                'trecho_inicial' => 'Rua Campos Sales',
                'trecho_final' => 'Trecho urbano - Campos Sales',
                'extensao_km' => 0.80,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'BR-364 (Alça Zona Sul)',
                'trecho_inicial' => 'BR-364 (Rua Três e Meio)',
                'trecho_final' => 'Acesso Zona Sul',
                'extensao_km' => 1.50,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'Estrada do Areia Branca',
                'trecho_inicial' => 'Zona Sul - ponto inicial',
                'trecho_final' => 'Zona Sul - ponto final',
                'extensao_km' => 3.20,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'Rua 16 de Junho (via municipal)',
                'trecho_inicial' => 'Início urbano',
                'trecho_final' => 'Término urbano',
                'extensao_km' => 1.10,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'Estrada do Santo Antônio',
                'trecho_inicial' => 'Trecho inicial',
                'trecho_final' => 'Trecho final',
                'extensao_km' => 4.00,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'Estrada de Ferro Madeira-Mamoré (EFMM) - trechos',
                'trecho_inicial' => 'Diversos trechos',
                'trecho_final' => 'Diversos trechos',
                'extensao_km' => 50.00,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'RO-010',
                'trecho_inicial' => 'Pimenta Bueno / Nova Estrela',
                'trecho_final' => 'Rolim de Moura / Nova Estrela',
                'extensao_km' => 120.00,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'RO-135',
                'trecho_inicial' => 'Trecho inicial (ex.)',
                'trecho_final' => 'Trecho final (ex.)',
                'extensao_km' => 78.50,
                'situacao' => 'regular',
            ],
            [
                'nome' => 'RO-370',
                'trecho_inicial' => 'Trevo Colorado / Cabixi',
                'trecho_final' => 'Corumbiara / Trevo Corumbiara',
                'extensao_km' => 200.00,
                'situacao' => 'regular',
            ],
        ];

        foreach ($rodovias as $rodovia) {
            Rodovia::create($rodovia);
        }
        
        $this->command->info('✅ 14 rodovias de Rondônia criadas com sucesso!');
    }
}
