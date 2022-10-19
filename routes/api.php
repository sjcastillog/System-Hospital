<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::resource('/pacientes', App\Http\Controllers\PacienteController::class)->only(['index', 'store', 'update', 'show', 'destroy' ]);

Route::resource('/consultas', App\Http\Controllers\ConsultaController::class)->only(['index', 'store', 'update', 'show', 'destroy' ]);

Route::resource('/users', App\Http\Controllers\UserController::class)->only(['index', 'store', 'update', 'show', 'destroy' ]);

Route::post('/login', [AuthenticatedSessionController::class, 'store'] );

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'] );

// Route::post('/registerUser', [RegisteredUserController::class, 'store'] );


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
