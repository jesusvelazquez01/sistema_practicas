<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Sala;

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
                $startDateTime = \Carbon\Carbon::parse($reserva->fecha . ' ' . $reserva->hora_entrada);
                $endDateTime = \Carbon\Carbon::parse($reserva->fecha . ' ' . $reserva->hora_salida);
                
                return [
                    'id' => $reserva->id,
                    'title' => $reserva->docente ? $reserva->docente->nombre : 'Sin docente',
                    'start' => $startDateTime->toIso8601String(),
                    'end' => $endDateTime->toIso8601String(),
                    'sala_id' => $reserva->sala_id,
                    'docente_id' => $reserva->docente_id,
                    'fecha' => $reserva->fecha,
                    'hora_entrada' => $reserva->hora_entrada,
                    'hora_salida' => $reserva->hora_salida,
                    'color' => '#3b82f6' // Color azul para las reservas
                ];
            });
        
        // Obtener la lista de docentes para el formulario
        $docentes = \App\Models\Docente::select('id', 'nombre', 'apellido')
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
        $existeReserva = Reserva::where('sala_id', $validated['sala_id'])
            ->where('fecha', $validated['fecha'])
            ->where(function($query) use ($validated) {
                $query->whereBetween('hora_entrada', [$validated['hora_entrada'], $validated['hora_salida']])
                      ->orWhereBetween('hora_salida', [$validated['hora_entrada'], $validated['hora_salida']])
                      ->orWhere(function($q) use ($validated) {
                          $q->where('hora_entrada', '<=', $validated['hora_entrada'])
                            ->where('hora_salida', '>=', $validated['hora_salida']);
                      });
            })
            ->exists();

        if ($existeReserva) {
            return back()->withErrors([
                'hora_entrada' => 'La sala ya está reservada en el horario seleccionado.'
            ]);
        }

        $reserva = Reserva::create($validated);

        return redirect()->route('reservas.calendar', ['sala' => $validated['sala_id']])
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
        //
    }
}
