<?php

namespace App\Http\Controllers;

use App\Models\Municipio;
use Illuminate\Http\Request;

class MunicipioController extends Controller
{
    /**
     * Listar todos os municípios
     */
    public function index(Request $request)
    {
        try {
            $query = Municipio::with('estado');

            // Filtrar por estado se fornecido
            if ($request->has('estado_id')) {
                $query->where('estado_id', $request->estado_id);
            }

            $municipios = $query->orderBy('nome')->get();
            return response()->json($municipios);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao carregar municípios',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Exibir município específico
     */
    public function show($id)
    {
        $municipio = Municipio::with('estado')->findOrFail($id);
        return response()->json($municipio);
    }
}

