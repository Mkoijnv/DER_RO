<?php

namespace App\Http\Controllers;

use App\Models\Ponte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PonteController extends Controller
{
    /**
     * Listar todas as pontes
     */
    public function index(Request $request)
    {
        $query = Ponte::with('rodovia')->orderBy('created_at', 'desc');

        // Filtrar apenas pontes com coordenadas se solicitado
        if ($request->has('with_coordinates') && $request->with_coordinates) {
            $query->whereNotNull('latitude')->whereNotNull('longitude');
        }

        $pontes = $query->get();
        
        // Adicionar URL completa da foto
        $pontes->transform(function ($ponte) {
            if ($ponte->foto) {
                $baseUrl = config('filesystems.disks.minio.url');
                $bucket = config('filesystems.disks.minio.bucket');
                // Codificar corretamente o caminho do arquivo, mantendo as barras
                $encodedPath = implode('/', array_map('rawurlencode', explode('/', $ponte->foto)));
                $ponte->foto_url = "{$baseUrl}/{$bucket}/{$encodedPath}";
            }
            return $ponte;
        });

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
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB
        ]);

        $data = $request->except('foto');

        // Upload da foto no MinIO
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto');
            $nomeArquivo = time() . '_' . $foto->getClientOriginalName();
            // Salvar na raiz do bucket (sem prefixo pontes/)
            $caminhoFoto = $foto->storeAs('', $nomeArquivo, 'minio');
            $data['foto'] = $caminhoFoto;
        }

        $ponte = Ponte::create($data);
        $ponte->load('rodovia');

        // Adicionar URL completa da foto
        if ($ponte->foto) {
            $baseUrl = config('filesystems.disks.minio.url');
            $bucket = config('filesystems.disks.minio.bucket');
            $encodedPath = implode('/', array_map('rawurlencode', explode('/', $ponte->foto)));
            $ponte->foto_url = "{$baseUrl}/{$bucket}/{$encodedPath}";
        }

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
        $ponte = Ponte::with('rodovia')->findOrFail($id);
        
        // Adicionar URL completa da foto
        if ($ponte->foto) {
            $baseUrl = config('filesystems.disks.minio.url');
            $bucket = config('filesystems.disks.minio.bucket');
            $encodedPath = implode('/', array_map('rawurlencode', explode('/', $ponte->foto)));
            $ponte->foto_url = "{$baseUrl}/{$bucket}/{$encodedPath}";
        }
        
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
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB
        ]);

        $data = $request->except('foto');

        // Upload da nova foto no MinIO
        if ($request->hasFile('foto')) {
            // Deletar foto antiga se existir
            if ($ponte->foto && Storage::disk('minio')->exists($ponte->foto)) {
                Storage::disk('minio')->delete($ponte->foto);
            }

            $foto = $request->file('foto');
            $nomeArquivo = time() . '_' . $foto->getClientOriginalName();
            // Salvar na raiz do bucket (sem prefixo pontes/)
            $caminhoFoto = $foto->storeAs('', $nomeArquivo, 'minio');
            $data['foto'] = $caminhoFoto;
        }

        $ponte->update($data);
        $ponte->load('rodovia');

        // Adicionar URL completa da foto
        if ($ponte->foto) {
            $baseUrl = config('filesystems.disks.minio.url');
            $bucket = config('filesystems.disks.minio.bucket');
            $encodedPath = implode('/', array_map('rawurlencode', explode('/', $ponte->foto)));
            $ponte->foto_url = "{$baseUrl}/{$bucket}/{$encodedPath}";
        }

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
        
        // Deletar foto do MinIO se existir
        if ($ponte->foto && Storage::disk('minio')->exists($ponte->foto)) {
            Storage::disk('minio')->delete($ponte->foto);
        }
        
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

