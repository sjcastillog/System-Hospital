<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consulta extends Model
{
    use HasFactory;
    protected $fillable = ['cedula_paciente', 'hora_cita', 'doctor', 'sucursal', 'nombre_paciente', 'fecha_cita'];
}
