<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Sala;
use App\Models\Reserva;
use App\Models\Docente;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $salas = Sala::all();
        return Inertia::render('Reservas/Index',[
            'salas' => $salas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $salaId = request()->query('sala');
        $sala = Sala::findOrFail($salaId);
        
        // Obtener las reservas existentes para esta sala
        $reservas = $sala->reservas()
            ->with('docente') // Cargar la relación con docente
            ->get()
            ->map(function($reserva) {
                // Formatear la fecha y hora para FullCalendar
                // Usar formato sin zona horaria para que FullCalendar lo interprete como hora local
                $start = $reserva->fecha . 'T' . $reserva->hora_entrada;
                $end = $reserva->fecha . 'T' . $reserva->hora_salida;
                
                return [
                    'id' => $reserva->id,
                    'title' => $reserva->docente 
                        ? "{$reserva->docente->apellido}, {$reserva->docente->nombre}" 
                        : 'Sin docente',
                    'start' => $start,
                    'end' => $end,
                    'sala_id' => $reserva->sala_id,
                    'docente_id' => $reserva->docente_id,
                    'fecha' => $reserva->fecha,
                    'hora_entrada' => $reserva->hora_entrada,
                    'hora_salida' => $reserva->hora_salida,
                    'color' => '#3b82f6' // Color azul para las reservas
                ];
            });
        
        // Obtener la lista de docentes para el formulario
        $docentes = Docente::select('id', 'nombre', 'apellido')
            ->get()
            ->map(fn($docente) => [
                'value' => $docente->id,
                'label' => "{$docente->apellido}, {$docente->nombre}"
            ]);
        
        return Inertia::render('Reservas/Calendar', [
            'sala' => $sala,
            'events' => $reservas,
            'docentes' => $docentes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fecha' => 'required|date',
            'hora_entrada' => 'required|date_format:H:i',
            'hora_salida' => 'required|date_format:H:i|after:hora_entrada',
            'docente_id' => 'required|exists:docentes,id',
            'sala_id' => 'required|exists:salas,id'
        ]);

        // Verificar disponibilidad de la sala
        // Una reserva se solapa si:
        // 1. La nueva hora_entrada está entre una reserva existente (hora_entrada < nueva_entrada < hora_salida)
        // 2. La nueva hora_salida está entre una reserva existente (hora_entrada < nueva_salida < hora_salida)
        // 3. La nueva reserva envuelve completamente una existente (nueva_entrada <= existente_entrada Y nueva_salida >= existente_salida)
        $existeReserva = Reserva::where('sala_id', $validated['sala_id'])
            ->where('fecha', $validated['fecha'])
            ->where(function($query) use ($validated) {
                // Caso 1: La hora de entrada de la nueva reserva cae dentro de una reserva existente
                $query->where(function($q) use ($validated) {
                    $q->where('hora_entrada', '<', $validated['hora_entrada'])
                      ->where('hora_salida', '>', $validated['hora_entrada']);
                })
                // Caso 2: La hora de salida de la nueva reserva cae dentro de una reserva existente
                ->orWhere(function($q) use ($validated) {
                    $q->where('hora_entrada', '<', $validated['hora_salida'])
                      ->where('hora_salida', '>', $validated['hora_salida']);
                })
                // Caso 3: La nueva reserva envuelve completamente una reserva existente
                ->orWhere(function($q) use ($validated) {
                    $q->where('hora_entrada', '>=', $validated['hora_entrada'])
                      ->where('hora_salida', '<=', $validated['hora_salida']);
                });
            })
            ->exists();

        if ($existeReserva) {
            return back()
            ->withErrors([
                'hora_entrada' => 'La sala ya está reservada en el horario seleccionado.'
            
            ]);
        }

        $reserva = Reserva::create($validated);

        // Redirigir de vuelta a la página de calendario con la sala
        return redirect()->route('reservas.create', ['sala' => $validated['sala_id']])
            ->with('success', 'Reserva creada exitosamente.');
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
        $reserva = Reserva::findOrFail($id);
        $salaId = $reserva->sala_id;
        $reserva->delete();

        return redirect()->route('reservas.create', ['sala' => $salaId])
            ->with('success', 'Reserva eliminada exitosamente.');
    }
}
