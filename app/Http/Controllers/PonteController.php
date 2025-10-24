<?php

namespace App\Http\Controllers;

use App\Models\Ponte;
use Illuminate\Http\Request;

class PonteController extends Controller
{
    /**
     * Listar todas as pontes
     */
    public function index(Request $request)
    {
        $query = Ponte::orderBy('created_at', 'desc');

        // Filtrar apenas pontes com coordenadas se solicitado
        if ($request->has('with_coordinates') && $request->with_coordinates) {
            $query->whereNotNull('latitude')->whereNotNull('longitude');
        }

        $pontes = $query->get();
        return response()->json($pontes);
    }

    /**
     * Criar nova ponte
     */
    public function store(Request $request)
    {
        $request->validate([
            'rodovia_id' => 'required|exists:rodovias,id',
            'nome' => 'required|string|max:255',
            'rio' => 'required|string|max:255',
            'km' => 'required|numeric|min:0',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'material' => 'required|in:concreto,aço,madeira,misto',
            'situacao' => 'required|in:boa,regular,ruim,interditada',
            'foto' => 'nullable|string',
        ]);

        $ponte = Ponte::create($request->all());

        return response()->json([
            'message' => 'Ponte criada com sucesso',
            'data' => $ponte
        ], 201);
    }

    /**
     * Exibir ponte específica
     */
    public function show($id)
    {
        $ponte = Ponte::findOrFail($id);
        return response()->json($ponte);
    }

    /**
     * Atualizar ponte
     */
    public function update(Request $request, $id)
    {
        $ponte = Ponte::findOrFail($id);

        $request->validate([
            'rodovia_id' => 'sometimes|required|exists:rodovias,id',
            'nome' => 'sometimes|required|string|max:255',
            'rio' => 'sometimes|required|string|max:255',
            'km' => 'sometimes|required|numeric|min:0',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'material' => 'sometimes|required|in:concreto,aço,madeira,misto',
            'situacao' => 'sometimes|required|in:boa,regular,ruim,interditada',
            'foto' => 'nullable|string',
        ]);

        $ponte->update($request->all());

        return response()->json([
            'message' => 'Ponte atualizada com sucesso',
            'data' => $ponte
        ]);
    }

    /**
     * Excluir ponte
     */
    public function destroy($id)
    {
        $ponte = Ponte::findOrFail($id);
        $ponte->delete();

        return response()->json([
            'message' => 'Ponte excluída com sucesso'
        ]);
    }

    /**
     * Obter pontes de uma rodovia específica
     */
    public function pontesPorRodovia($rodoviaId)
    {
        $pontes = Ponte::where('rodovia_id', $rodoviaId)
            ->orderBy('km')
            ->get();

        return response()->json($pontes);
    }
}

