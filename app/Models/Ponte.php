<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
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
     * Atributos que devem ser anexados ao modelo
     */
    protected $appends = ['foto_url'];

    /**
     * Uma ponte pertence a uma rodovia.
     */
    public function rodovia()
    {
        return $this->belongsTo(Rodovia::class);
    }

    /**
     * Accessor para URL completa da foto
     * Otimiza o processamento evitando repetição de código
     */
    protected function fotoUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->foto) {
                    return null;
                }

                $baseUrl = config('filesystems.disks.minio.url');
                $bucket = config('filesystems.disks.minio.bucket');
                
                // Codificar corretamente o caminho do arquivo, mantendo as barras
                $encodedPath = implode('/', array_map('rawurlencode', explode('/', $this->foto)));
                
                return "{$baseUrl}/{$bucket}/{$encodedPath}";
            }
        );
    }
}
