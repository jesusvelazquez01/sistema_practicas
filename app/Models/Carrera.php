<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Carrera extends Model
{
     use HasFactory;
    protected $fillable =[
        'nombre',
        'turno',
    ];
    //Bien chicos esto se los dejo aca dale ?  lo que pasa aca es que una carrera tiene muchos docentes si ?
    //Si ven un video van a ver que la relacion de 1 a N se hace asi como esta aca abajo
    //estamos diciendo que carrera tiene muchos docentes con el hasMany si ?
    //Despues de aca tenes que ir a ver como esta el modelo de docente
    // Una vez que fuiste ahora si , vamos a tener que reconstruir nuestra base de datos porque ahora se agrego una relacion si ?
    //esto se hace con php artisan migrate:fresh
    //Antes de esto TENEMOS QUE FIJARNOS NUESTRA MIGRACION DE DOCENTES QUE ES LA CONTIENE LA ForeingID
          public function docentes()
    {
        return $this->hasMany(Docente::class);
    }
}
