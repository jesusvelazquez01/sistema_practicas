<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sala;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
class SalaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Aca creamos una variable que va almacenar todo el modelo de la sala
        //Y como es una funcion debemos retonar valores, es decir vamos a traer todas las 
        //salas que hay en el sistema y se la pasamos a la vista Index.tsx que se encuentra
        //en la carpeta resources->js->pages
        //Paginate es un metodo de Inertia que nos va ayudar a traer los datos de 10 en 10
        //O puede ser de 5 en 5 o como lo deees vos entonces esto se pasa al componente para mostralos ahi
        $salas = Sala::paginate(5);
        return Inertia::render('Salas/Index',[
            'sala' => $salas
        ]);
        //Cabe recalcar que nosotros debemos crear las carpetas dentro de este directorio
        //Vean como ejemplo la carpeta "Salas" y dentro de ella el archivo "Index.tsx"
        //Lo crean dando click derecho en pages, basicamente creen ustedes ahi la carpeta 
        //New folder y despues new file 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //Aca no hay mucha ciencia lo que se hace es basicamente renderizar el componente create.tsx cuando se va a la ruta de /create
        return Inertia::render('Salas/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Se crea un bloque try catch para el buen manejo de excepciones y por buenas practicas de programacion
        //primeramente se crea una variable validated => despues como viene por parametro los datos del formulario
        //
       try{
        $validated = $request->validate([
            'nombre' => 'required|string|max:150',
            'disponibilidad' => 'required',
        ],[
            'nombre.required' => 'El nombre es requerido',
            'disponibilidad.required' => 'La disponibilidad es requerida'
        ]);
        //Acá ya pasados los datos y haberse validado pasan recien a crearse
        Sala::create($validated);
        //Aca lo que se hace es redireccionar
        return redirect()
        //A la ruta de salas.index
        ->route('salas.index')
        //Despues se muestra un mensaje flash con el mensaje de creación
        ->with('success', 'Sala creada exitosamente');
        
       }catch(ValidationException $e){
        return redirect()
         ->back()
        ->withErrors($e->errors())
        ->withInput()
        ->with('warning', 'Corriga los errores del formulario. ');
       } 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //Aca lo que se hace es basicamente renderizar la vista de edit con el dato de la sala
        $sala = Sala::findOrFail($id);
        return Inertia::render('Salas/Edit',[
            'sala' => $sala
        ]);
    }
    public function update(Request $request, Sala $sala)
    {
        //Idem al anterior aca lo que se hace es traer los datos de la sala que se elecciona
        //tambien traemos el modelo para poder despues actualizarlo
        try{
            //Aca es donde se hace lo de la validacion
            $request->validate([
                'nombre' => 'required|string|max:150',
                'disponibilidad' => 'required',
            ],[
                //Aca es para que se muestren en español cuando dejemos vacio el campo y le demos a guardar tiene que aparecer
                //el nombre es requerido
                'nombre' => 'El nombre es requerido',
                'disponibilidad' => 'La disponibilidad es requerida'
            ]);
            //Una vez validado se actualiza con el metodo update
            $sala->update($request->all());
            return redirect()
            ->route('salas.index')
            ->with('success', 'Sala actualizada exitosamente');
        }catch(ValidationException $e){
            return redirect()
            //bueno aca se duelve si hubo algun error en el formulario 
            ->back()
            ->withErrors($e)
            ->withInput()
            ->with('warning', 'Corrige los errores del formulario.');
        }
    }


    public function destroy(Sala $sala)
    {
        $sala->delete();
        return redirect()
        ->route('salas.index')
        ->with('success', 'Sala eliminada exitosamente');
    }
}
