<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use App\Models\Carrera; // ¡IMPORTANTE! Necesitas el modelo Carrera
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule; // Necesario para la validación unique en update

class DocenteController extends Controller
{
    /**
     * READ: Muestra la lista de docentes.
     */
    public function index()
    {
        // 1. Cargamos los docentes paginados y su relación 'carrera'
        $docentes = Docente::with('carrera')->paginate(10);
        
        // 2. Cargamos TODAS las carreras para el formulario
        $carreras = Carrera::all(); 

        return Inertia::render('Docentes/Index', [
            'docentes' => $docentes,
            'carreras' => $carreras, // Pasamos las carreras al Index para que las use el DocenteForm
        ]);
    }

    /**
     * Muestra el formulario vacío para crear.
     */
    public function create()
    {
        $carreras = Carrera::all(); 
        
        return Inertia::render('Docentes/Create', [
            'carreras' => $carreras, // Pasamos las carreras al formulario Create.tsx
        ]);
    }

    /**
     * STORE: Guarda un nuevo recurso.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            // El email debe ser único en la tabla 'docentes'
            'email' => 'required|email|unique:docentes,email', 
            // idcarrera debe existir en la tabla 'carrera'
            'idcarrera' => 'required|integer|exists:carrera,idcarrera', 
        ]);

        Docente::create($validated);

        // Mensaje de éxito después de la redirección
        return redirect()->route('docentes.index')->with('success', 'Docente creado con éxito.');
    }

    /**
     * Muestra el docente especificado para editar.
     * Usamos Route Model Binding: Laravel busca el docente automáticamente.
     */
    public function edit(Docente $docente)
    {
        $carreras = Carrera::all();
        
        return Inertia::render('Docentes/Edit', [
            'docente' => $docente, // Ya viene cargado por Laravel
            'carreras' => $carreras, // Pasamos las carreras al formulario Edit.tsx
        ]);
    }

    /**
     * UPDATE: Actualiza el recurso especificado.
     */
    public function update(Request $request, Docente $docente)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            // El email debe ser único, IGNORANDO el email del docente actual
            'email' => ['required', 'email', Rule::unique('docentes', 'email')->ignore($docente->iddocente, 'iddocente')],
            'idcarrera' => 'required|integer|exists:carrera,idcarrera',
        ]);

        $docente->update($validated);

        return redirect()->route('docentes.index')->with('success', 'Docente actualizado con éxito.');
    }

    /**
     * DESTROY: Elimina el recurso especificado.
     */
    public function destroy(Docente $docente)
    {
        $docente->delete();

        return redirect()->route('docentes.index')->with('success', 'Docente eliminado con éxito.');
    }
}