<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Define las rutas del proyecto.
     */
    public function boot(): void
    {
        $this->routes(function () {
            // ✅ Rutas API (prefijo /api)
            Route::prefix('api')
                ->middleware('api')
                ->group(base_path('routes/api.php'));

            // ✅ Rutas Web
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
