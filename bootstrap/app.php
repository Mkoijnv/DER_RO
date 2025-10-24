<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        apiPrefix: 'api',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Definir locale para pt_BR em todas as requisições
        $middleware->append(\App\Http\Middleware\SetLocale::class);
        
        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
            'api.auth' => \App\Http\Middleware\ApiAuthenticate::class,
        ]);
        
        // Configurar para retornar JSON em erros de autenticação na API
        $middleware->redirectGuestsTo(fn ($request) => 
            $request->is('api/*') 
                ? response()->json(['message' => 'Não autenticado.'], 401)
                : route('login')
        );
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
