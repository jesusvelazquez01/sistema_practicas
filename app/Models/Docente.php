<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Docente extends Model
{
     use HasFactory;
    protected $fillable =[
        'nombre',
        'apellido',
        'email',
        'carrera',
    ];
    //Aca en el modelo de docente le vamos a decir que, muchos docentes pertenecen a una carrera
    //esto se logra con el belongsTo si ? estamos diciendo que muchos docentes pertenecen a una sola carrera
        public function carrera()
            {
                return $this->belongsTo(Carrera::class);
            }
}
