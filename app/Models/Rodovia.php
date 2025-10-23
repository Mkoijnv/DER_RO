<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rodovia extends Model
{
    use HasFactory;

    protected $fillable = [
        'rodovia',
        'trecho_inicial',
        'trecho_final',
        'extensao_km',
        'situacao',
        'municipios', // manter caso ainda use JSON antes da pivô
    ];

    /**
     * Uma rodovia pode passar por vários municípios (N:N).
     */
    public function municipios()
    {
        return $this->belongsToMany(Municipio::class, 'municipio_rodovia');
    }

    /**
     * Uma rodovia possui várias pontes (1:N).
     */
    public function pontes()
    {
        return $this->hasMany(Ponte::class);
    }
}
