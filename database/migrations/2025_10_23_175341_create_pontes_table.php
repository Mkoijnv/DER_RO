<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pontes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rodovia_id')->constrained('rodovias')->onDelete('cascade');
            $table->string('nome');
            $table->string('rio')->nullable();
            $table->decimal('km', 8, 2);
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->enum('material', ['concreto', 'aço', 'madeira', 'misto'])->default('concreto');
            $table->enum('situacao', ['boa', 'regular', 'ruim', 'interditada'])->default('boa');
            $table->string('foto')->nullable(); // Caminho da imagem
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pontes');
    }
};
