<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ElementoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Las rutas definidas acá usan automáticamente el prefijo "/api".
| Ejemplo: http://127.0.0.1:8000/api/elementos
|
*/

Route::middleware('api')->group(function () {
    Route::apiResource('elementos', ElementoController::class);
});
