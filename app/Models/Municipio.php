<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    use HasFactory;

    protected $fillable = [
        'estado_id',
        'nome',
        'codigo_ibge',
        'latitude',
        'longitude',
    ];

    /**
     * Um município pertence a um estado.
     */
    public function estado()
    {
        return $this->belongsTo(Estado::class);
    }

    /**
     * Um município pode estar vinculado a várias rodovias (N:N).
     * Exemplo: BR-364 passa por diversos municípios.
     */
    public function rodovias()
    {
        return $this->belongsToMany(Rodovia::class, 'municipio_rodovia');
    }
}
