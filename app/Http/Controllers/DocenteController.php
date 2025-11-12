<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Docente;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class DocenteController extends Controller
{
    public function index()
    {
             $docentes = Docente::with(['carrera'])->latest()->paginate(10);
            return Inertia::render('Docentes/Index',[
                'docentes' => $docentes
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // app/Http/Controllers/DocenteController.php

    public function create()
    {
        $carreras = \App\Models\Carrera::all();
        return Inertia::render('Docentes/Create', [
        'carreras' => $carreras
         ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $validated = $request->validate([
                'nombre' => 'required|string|max:255',
                'apellido' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:docentes',
                'carrera_id' => 'required|exists:carreras,id',
            ],[
                'nombre.required' => 'El nombre es obligatorio.',
                'apellido.required' => 'El apellido es obligatorio.',
                'email.required' => 'El email es obligatorio.',
                'email.email' => 'El formato del email no es válido.',
                'email.unique' => 'Este email ya está registrado.',
                'carrera_id.required' => 'La carrera es obligatoria.',
            ]);

            Docente::create($validated);

            return redirect()->route('docentes.index')
                ->with('success', 'Docente creado correctamente.');

        }catch(ValidationException $e){
            return back()->withErrors($e->errors())->withInput()
                ->with('warning','Corriga los errores del formulario.');
        }
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
        $carreras = \App\Models\Carrera::all();
        return Inertia::render('Docentes/Edit',[
            'docente' => Docente::findOrFail($id),
            'carreras' => $carreras
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Docente $docente)
    {
        try {
            $validated = $request->validate([
                'nombre' => 'required|string|max:255',
                'apellido' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:docentes,email,' . $docente->id,
                'carrera_id' => 'required|exists:carreras,id',
            ], [
                'nombre.required' => 'El nombre es obligatorio.',
                'apellido.required' => 'El apellido es obligatorio.',
                'email.required' => 'El email es obligatorio.',
                'email.email' => 'El formato del email no es válido.',
                'email.unique' => 'Este email ya está en uso por otro docente.',
                'carrera_id.required' => 'La carrera es obligatoria.',
            ]);

            $docente->update($validated);

            return redirect()->route('docentes.index')->with('success', 'Docente actualizado correctamente.');
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->withInput()
                ->with('warning', 'Corriga los errores del formulario.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Docente $docente)
    {
         $docente->delete();

        return redirect()->route('docentes.index')->with('success', 'Docente eliminado correctamente.');
    }
}
