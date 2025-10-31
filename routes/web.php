<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\CarreraController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\ElementoController;
use App\Http\Controllers\ReservaController;


Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard',[
            
        ]);
    })->name('dashboard');
});
//Aca vamos a listar todas las rutas de nuestra app o sistema
//por ejemplo el codigo Route::resource me da los 5 metodos basicos de un crud
Route::resource('salas', SalaController::class);
Route::resource('carreras',CarreraController::class);
Route::resource('docentes',DocenteController::class);
Route::resource('elementos', ElementoController::class);
Route::resource('reservas', ReservaController::class);
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';