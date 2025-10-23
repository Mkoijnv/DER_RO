<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'uf',
        'codigo_ibge',
    ];

    /**
     * Um estado tem muitos municípios.
     */
    public function municipios()
    {
        return $this->hasMany(Municipio::class);
    }
}
