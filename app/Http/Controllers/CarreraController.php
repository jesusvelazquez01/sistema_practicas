<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carrera;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class CarreraController extends Controller
{
    public function index()
    {
            $carreras = Carrera::paginate(10);
            return Inertia::render('Carreras/Index',[
                'carrera' => $carreras
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Carreras/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $validated = $request->validate([
                'nombre' => 'required|string|max:255',
                'turno' => 'required|string|max:255',
            ],[
                'nombre.required' => 'El nombre es obligatorio',
                'turno.required' => 'El turno es obligatorio',
            ]);
        $carrera = Carrera::create($validated);
           return redirect()
           ->route('carreras.index')
           ->with('success', 'Carrera creada exitosamente');
        }catch(ValidatedException $e){
            return redirect()
        ->back()
        ->withErrors($e->errors())
        ->withInput()
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
        $carrera = Carrera::findOrFail($id);
        return Inertia::render('Carreras/Edit', [
            'carre' => $carrera
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $carrera = Carrera::findOrFail($id);
        
        try {
            $validated = $request->validate([
                'nombre' => 'required|string|max:255',
                'turno' => 'required|string|max:255',
            ], [
                'nombre.required' => 'El nombre es obligatorio',
                'turno.required' => 'El turno es obligatorio',
            ]);
            
            $carrera->update($validated);
            
            return redirect()
                ->route('carreras.index')
                ->with('success', 'Carrera actualizada exitosamente');
                
        } catch (ValidationException $e) {
            return redirect()
                ->back()
                ->withErrors($e->errors())
                ->withInput()
                ->with('warning', 'Corrige los errores del formulario.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('warning', 'No se pudo actualizar la carrera: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Carrera $carrera)
    {
        $carrera->delete();
        return redirect()->route('carreras.index')
        ->with('success', 'Carrera eliminada exitosamente');
    }
}
