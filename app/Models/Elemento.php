<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Elemento extends Model
{
    use HasFactory;
    protected $table = 'elementos';
    protected $primaryKey = 'idelementos';
    protected $fillable = ['nombre', 'marca', 'cantidad', 'estado'];
}
