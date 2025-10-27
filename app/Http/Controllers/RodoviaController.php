<?php

namespace App\Http\Controllers;

use App\Models\Rodovia;
use Illuminate\Http\Request;

class RodoviaController extends Controller
{
    /**
     * Listar todas as rodovias
     */
    public function index()
    {
        try {
            $rodovias = Rodovia::with('municipios.estado')
                ->orderBy('created_at', 'desc')
                ->get();
            return response()->json($rodovias);
        } catch (\Exception $e) {
            // Se a tabela pivô não existir ainda, retorna rodovias sem municípios
            $rodovias = Rodovia::orderBy('created_at', 'desc')->get();
            return response()->json($rodovias);
        }
    }

    /**
     * Criar nova rodovia
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'trecho_inicial' => 'nullable|string|max:255',
            'trecho_final' => 'nullable|string|max:255',
            'extensao_km' => 'nullable|numeric|min:0',
            'situacao' => 'nullable|in:boa,regular,ruim,interditada',
            'municipios' => 'nullable|array',
            'municipios.*' => 'exists:municipios,id',
        ]);

        $rodovia = Rodovia::create($request->except(['municipios', '_method', '_token']));

        // Vincular municípios se fornecidos
        if ($request->has('municipios') && is_array($request->municipios)) {
            try {
                $rodovia->municipios()->sync($request->municipios);
            } catch (\Exception $e) {
                // Tabela pivô não existe ainda, ignora
            }
        }

        try {
            $rodovia->load('municipios.estado');
        } catch (\Exception $e) {
            // Ignora se não conseguir carregar
        }

        return response()->json([
            'message' => 'Rodovia criada com sucesso',
            'data' => $rodovia
        ], 201);
    }

    /**
     * Exibir rodovia específica
     */
    public function show($id)
    {
        try {
            $rodovia = Rodovia::with('municipios.estado')->findOrFail($id);
            return response()->json($rodovia);
        } catch (\Exception $e) {
            // Se a tabela pivô não existir ainda, retorna rodovia sem municípios
            $rodovia = Rodovia::findOrFail($id);
            return response()->json($rodovia);
        }
    }

    /**
     * Atualizar rodovia
     */
    public function update(Request $request, $id)
    {
        $rodovia = Rodovia::findOrFail($id);

        $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'trecho_inicial' => 'sometimes|nullable|string|max:255',
            'trecho_final' => 'sometimes|nullable|string|max:255',
            'extensao_km' => 'sometimes|nullable|numeric|min:0',
            'situacao' => 'sometimes|nullable|in:boa,regular,ruim,interditada',
            'municipios' => 'sometimes|nullable|array',
            'municipios.*' => 'exists:municipios,id',
        ]);

        $rodovia->update($request->except(['municipios', '_method', '_token']));

        // Atualizar municípios se fornecidos
        if ($request->has('municipios') && is_array($request->municipios)) {
            try {
                $rodovia->municipios()->sync($request->municipios);
            } catch (\Exception $e) {
                // Tabela pivô não existe ainda, ignora
            }
        }

        try {
            $rodovia->load('municipios.estado');
        } catch (\Exception $e) {
            // Ignora se não conseguir carregar
        }

        return response()->json([
            'message' => 'Rodovia atualizada com sucesso',
            'data' => $rodovia
        ]);
    }

    /**
     * Excluir rodovia
     */
    public function destroy($id)
    {
        $rodovia = Rodovia::findOrFail($id);
        $rodovia->delete();

        return response()->json([
            'message' => 'Rodovia excluída com sucesso'
        ]);
    }

    /**
     * Obter rodovia com suas pontes
     */
    public function pontesRodovia($id)
    {
        $rodovia = Rodovia::with(['pontes' => function ($query) {
            $query->orderBy('km');
        }])->findOrFail($id);

        return response()->json($rodovia);
    }
}

