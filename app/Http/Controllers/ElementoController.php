<?php

namespace App\Http\Controllers;

use App\Models\Elemento;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class ElementoController extends Controller
{
    public function index()
    {
        $elementos = Elemento::query()
            ->orderBy('idelementos', 'desc')
            ->paginate(5)
            ->onEachSide(1);

        return inertia('Elementos/Index', [
            'elementos' => $elementos
        ]);
    }

    public function create()
    {
        return Inertia::render('Elementos/Create');
    }

    public function store(Request $request)
    {
        try{
            $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'cantidad' => 'required|integer|min:0',
            'estado' => 'required|string|max:255',
        ],[
            'nombre.required' => 'El nombre es obligatorio.',
            'marca.required' => 'La marca es obligatoria.',
            'cantidad.required' => 'La cantidad es obligatoria.',
            'estado.required' => 'El estado es obligatorio.',
        ]);

        Elemento::create($request->all());

        return redirect()
        ->route('elementos.index')
        ->with('success', 'Elemento creado correctamente.');
        }catch(ValidationException $e){
            return redirect()
            ->back()
            ->withErrors($e->errors())
            ->withInput()
            ->with('warning','Corriga los errores del formulario.');
        }
      
    }

    public function edit(Elemento $elemento)
    {
        return Inertia::render('Elementos/Edit', [
            'elemento' => $elemento
        ]);
    }

    public function update(Request $request, Elemento $elemento)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'cantidad' => 'required|integer',
            'estado' => 'required|string|max:255',
        ],[
            'nombre.required' => 'El nombre es obligatorio.',
            'marca.required' => 'La marca es obligatoria.',
            'cantidad.required' => 'La cantidad es obligatoria.',
            'estado.required' => 'El estado es obligatorio.',
        ]);

        $elemento->update($request->all());

        return redirect()->route('elementos.index')->with('success', 'Elemento actualizado correctamente.');
    }

    public function destroy(Elemento $elemento)
    {
        $elemento->delete();

        return redirect()->route('elementos.index')->with('success', 'Elemento eliminado correctamente.');
    }
}
