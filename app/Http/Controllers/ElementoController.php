<?php

namespace App\Http\Controllers;

use App\Models\Elemento;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ElementoController extends Controller
{
    public function index()
    {
        $elementos = Elemento::query()
            ->orderBy('idelementos', 'desc')
            ->paginate(5) // Se muestra 5 por página
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
        $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'cantidad' => 'required|integer',
            'estado' => 'required|string|max:255',
        ]);

        Elemento::create($request->all());

        return redirect()->route('elementos.index')->with('success', 'Elemento creado correctamente.');
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
