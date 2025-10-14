<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sala;
use Inertia\Inertia;
class SalaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Aca creamos una variable que va almacenar todo el modelo de la sala
        //Y como es una funcion debemos retonar valores, es decir vamos a traer todas las 
        //salas que hay en el sistema y se la pasamos a la vista Index.tsx que se encuentra
        //en la carpeta resources->js->pages
        //Paginate es un metodo de Inertia que nos va ayudar a traer los datos de 10 en 10
        //O puede ser de 5 en 5 o como lo deees vos entonces esto se pasa al componente para mostralos ahi
        $salas = Sala::paginate(10);
        return Inertia::render('Salas/Index',[
            'salas' => $salas
        ]);
        //Cabe recalcar que nosotros debemos crear las carpetas dentro de este directorio
        //Vean como ejemplo la carpeta "Salas" y dentro de ella el archivo "Index.tsx"
        //Lo crean dando click derecho en pages, basicamente creen ustedes ahi la carpeta 
        //New folder y despues new file 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Salas/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
