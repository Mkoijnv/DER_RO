<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ponte extends Model
{
    use HasFactory;

    protected $fillable = [
        'rodovia_id',
        'nome',
        'rio',
        'km',
        'latitude',
        'longitude',
        'material',
        'situacao',
        'foto',
    ];

    /**
     * Uma ponte pertence a uma rodovia.
     */
    public function rodovia()
    {
        return $this->belongsTo(Rodovia::class);
    }
}
