<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Elemento extends Model
{
    use HasFactory;

    protected $table = 'elementos';
    protected $primaryKey = 'idelementos';
    public $timestamps = true;

    protected $fillable = [
        'nombre',
        'marca',
        'cantidad',
        'estado',
    ];

    // Seguridad: evita asignación masiva de columnas sensibles
    protected $guarded = ['idelementos'];

    // Relación (si luego conectás con reservas)
    public function reservas()
    {
        return $this->hasMany(ReservaElemento::class, 'idelementos', 'idelementos');
    }
}
