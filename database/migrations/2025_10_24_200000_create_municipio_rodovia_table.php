<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tabela pivô para relacionamento N:N entre municípios e rodovias
     * Uma rodovia pode passar por vários municípios
     * Um município pode ter várias rodovias
     */
    public function up(): void
    {
        Schema::create('municipio_rodovia', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('municipio_id');
            $table->unsignedBigInteger('rodovia_id');
            $table->timestamps();

            // Chaves estrangeiras
            $table->foreign('municipio_id')
                ->references('id')
                ->on('municipios')
                ->onDelete('cascade');

            $table->foreign('rodovia_id')
                ->references('id')
                ->on('rodovias')
                ->onDelete('cascade');

            // Evitar duplicatas
            $table->unique(['municipio_id', 'rodovia_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('municipio_rodovia');
    }
};

