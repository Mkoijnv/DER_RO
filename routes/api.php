<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RodoviaController;
use App\Http\Controllers\PonteController;
use App\Http\Controllers\EstadoController;
use App\Http\Controllers\MunicipioController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Rota de teste / health check
Route::get('/', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API do Sistema de Rodovias e Pontes está funcionando!',
        'version' => '1.0.0',
        'endpoints' => [
            'auth' => [
                'POST /api/register' => 'Criar nova conta',
                'POST /api/login' => 'Fazer login',
                'POST /api/logout' => 'Fazer logout (requer autenticação)',
            ],
            'rodovias' => [
                'GET /api/rodovias' => 'Listar todas as rodovias',
                'POST /api/rodovias' => 'Criar nova rodovia',
                'GET /api/rodovias/{id}' => 'Ver detalhes da rodovia',
                'PUT /api/rodovias/{id}' => 'Atualizar rodovia',
                'DELETE /api/rodovias/{id}' => 'Excluir rodovia',
            ],
            'pontes' => [
                'GET /api/pontes' => 'Listar todas as pontes',
                'POST /api/pontes' => 'Criar nova ponte',
                'GET /api/pontes/{id}' => 'Ver detalhes da ponte',
                'PUT /api/pontes/{id}' => 'Atualizar ponte',
                'DELETE /api/pontes/{id}' => 'Excluir ponte',
            ]
        ]
    ]);
});

// Rotas públicas de autenticação
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rotas públicas para consulta de estados e municípios
Route::get('/estados', [EstadoController::class, 'index']);
Route::get('/estados/{id}', [EstadoController::class, 'show']);
Route::get('/estados/{id}/municipios', [EstadoController::class, 'municipios']);
Route::get('/municipios', [MunicipioController::class, 'index']);

// Rotas protegidas por autenticação
Route::middleware('auth:sanctum')->group(function () {
    // Autenticação
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Rodovias
    Route::apiResource('rodovias', RodoviaController::class);
    Route::get('rodovias/{id}/pontes', [RodoviaController::class, 'pontesRodovia']);

    // Pontes
    Route::apiResource('pontes', PonteController::class);
    Route::get('rodovias/{rodoviaId}/pontes-lista', [PonteController::class, 'pontesPorRodovia']);
});

