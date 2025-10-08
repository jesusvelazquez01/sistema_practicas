<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('elementos', function (Blueprint $table) {
            $table->id('idelementos');                   // Clave primaria autoincremental
            $table->string('nombre', 100);               // Nombre del elemento
            $table->string('marca', 100)->nullable();    // Marca (puede ser nulo)
            $table->unsignedInteger('cantidad')->default(0); // No se permiten negativos
            $table->enum('estado', ['Disponible', 'En préstamo', 'Dañado'])
                ->default('Disponible');               // Estado restringido a valores válidos
            $table->timestamps();                        // created_at y updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('elementos');
    }
};
