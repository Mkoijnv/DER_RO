<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RodoviaController;
use App\Http\Controllers\PonteController;
use App\Http\Controllers\EstadoController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\ApiDocumentationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Documentação da API
Route::get('/', [ApiDocumentationController::class, 'index']);

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

