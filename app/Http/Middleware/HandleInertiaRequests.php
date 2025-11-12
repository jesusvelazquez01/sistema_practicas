<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use App\Models\Sala;
use App\Models\Reserva;
use App\Models\Elemento;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');
        $salas = Sala::count();
        $reservas = Reserva::count();
        $elementos = Elemento::count();
        // Obtener reservas por sala con el nombre de la sala
        $reservasPorSala = Reserva::query()
            ->join('salas', 'reservas.sala_id', '=', 'salas.id')
            ->select('salas.id', 'salas.nombre', DB::raw('COUNT(*) as total_reservas'))
            ->groupBy('salas.id', 'salas.nombre')
            ->orderByDesc('total_reservas')
            ->get()
            ->toArray();

        // Obtener docentes con más reservas
        $docentesConReservas = Reserva::query()
            ->join('docentes', 'reservas.docente_id', '=', 'docentes.id')
            ->select(
                'docentes.id', 
                'docentes.nombre',
                'docentes.apellido', 
                DB::raw('COUNT(*) as total_reservas')
            )
            ->groupBy('docentes.id', 'docentes.nombre', 'docentes.apellido')
            ->orderByDesc('total_reservas')
            ->get()
            ->toArray();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'stats' => [
                'total_salas' => $salas,
                'total_reservas' => $reservas,
                'total_elementos' => $elementos,
                'reservas_por_sala' => $reservasPorSala,
                'docentes_con_reservas' => $docentesConReservas
            ],
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
                'info' => $request->session()->get('info'),
            ],
            'sidebarOpen' => !$request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true'
        ];
    }
}
