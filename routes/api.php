<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ElementoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Estas rutas ya usan automáticamente el prefijo "/api".
| Ejemplo: http://127.0.0.1:8000/api/elementos
|
*/

// Rutas de Elementos sin agrupar en middleware (ya están dentro del grupo API)
Route::apiResource('elementos', ElementoController::class);


Route::get('/prueba', function () {
    return response()->json(['mensaje' => 'Laravel está leyendo api.php']);
});
