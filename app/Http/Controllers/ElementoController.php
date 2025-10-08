<?php

namespace App\Http\Controllers;

use App\Models\Elemento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ElementoController extends Controller
{
    // Mostrar todos los elementos
    public function index()
    {
        return response()->json(Elemento::all(), 200);
    }

    // Crear un nuevo elemento
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:100',
            'marca' => 'nullable|string|max:100',
            'cantidad' => 'required|integer|min:0',
            'estado' => 'required|in:Disponible,En préstamo,Dañado',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $elemento = Elemento::create($validator->validated());
        return response()->json(['message' => 'Elemento creado correctamente', 'data' => $elemento], 201);
    }

    // Mostrar un elemento por ID
    public function show($id)
    {
        $elemento = Elemento::find($id);
        if (!$elemento) {
            return response()->json(['message' => 'Elemento no encontrado'], 404);
        }
        return response()->json($elemento, 200);
    }

    // Actualizar un elemento existente
    public function update(Request $request, $id)
    {
        $elemento = Elemento::find($id);
        if (!$elemento) {
            return response()->json(['message' => 'Elemento no encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre' => 'sometimes|required|string|max:100',
            'marca' => 'nullable|string|max:100',
            'cantidad' => 'sometimes|required|integer|min:0',
            'estado' => 'sometimes|required|in:Disponible,En préstamo,Dañado',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $elemento->update($validator->validated());
        return response()->json(['message' => 'Elemento actualizado correctamente', 'data' => $elemento], 200);
    }

    // Eliminar un elemento
    public function destroy($id)
    {
        $elemento = Elemento::find($id);
        if (!$elemento) {
            return response()->json(['message' => 'Elemento no encontrado'], 404);
        }

        $elemento->delete();
        return response()->json(['message' => 'Elemento eliminado correctamente'], 200);
    }
}
