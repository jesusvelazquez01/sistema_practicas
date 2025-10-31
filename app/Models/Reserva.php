<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $fillable = [
        'fecha',
        'hora_entrada',
        'hora_salida',
        'docente_id',
        'sala_id',
    ];
    public function docente(){
        return $this->belongsTo(Docente::class);
    }
    public function sala(){
        return $this->belongsTo(Sala::class);
    }
}
