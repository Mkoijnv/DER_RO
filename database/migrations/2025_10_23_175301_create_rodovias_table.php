<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rodovias', function (Blueprint $table) {
            $table->id();
            $table->string('nome'); // Ex: BR-364
            $table->string('trecho_inicial')->nullable(); // Ex: início de um cruzamento
            $table->string('trecho_final')->nullable();   // Ex: fim do trecho
            $table->decimal('extensao_km', 8, 2)->nullable(); // Extensão em km
            $table->enum('situacao', ['boa', 'regular', 'ruim', 'interditada'])->default('boa');
            $table->timestamps();
            
            // Estados são obtidos através dos municípios (relação N:N na tabela municipio_rodovia)
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rodovias');
    }
};
