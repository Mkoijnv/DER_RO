<?php

namespace App\Http\Controllers;

use App\Models\Estado;
use Illuminate\Http\Request;

class EstadoController extends Controller
{
    /**
     * Listar todos os estados
     */
    public function index()
    {
        try {
            $estados = Estado::orderBy('nome')->get();
            return response()->json($estados);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao carregar estados',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Exibir estado específico com seus municípios
     */
    public function show($id)
    {
        $estado = Estado::with('municipios')->findOrFail($id);
        return response()->json($estado);
    }

    /**
     * Listar municípios de um estado
     */
    public function municipios($id)
    {
        $estado = Estado::with(['municipios' => function ($query) {
            $query->orderBy('nome');
        }])->findOrFail($id);

        return response()->json($estado->municipios);
    }
}

