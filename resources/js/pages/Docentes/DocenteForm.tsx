// resources/js/Pages/Docentes/DocenteForm.tsx
import React from 'react';
import { useForm, router } from '@inertiajs/react';

// === ESTA DECLARACIÓN RESUELVE EL ERROR DE TIPO PARA 'route()' ===
declare function route(name: string, params?: any): string; 
// ===============================================================

// Define las interfaces para tipado (TypeScript)
interface Carrera {
idcarrera: number;
nombre: string;
turno: string;
}

interface Docente {
iddocente: number;
nombre: string;
apellido: string;
email: string;
idcarrera: number;
}

interface DocenteFormProps {
docente?: Docente;   // Opcional: si estamos editando
carreras: Carrera[];    // Lista de carreras
action: 'create' | 'edit'; // Indica si es creación o edición
}

const DocenteForm: React.FC<DocenteFormProps> = ({ docente, carreras, action }) => {

const isEdit = action === 'edit';
const title = isEdit ? 'Editar Docente' : 'Crear Nuevo Docente';

const { data, setData, post, put, processing, errors } = useForm({
nombre: docente?.nombre || '',
apellido: docente?.apellido || '',
email: docente?.email || '',
idcarrera: docente?.idcarrera || '',
});

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();

if (isEdit && docente) {
// Lógica de edición (PUT)
put(route('docentes.update', docente.iddocente), {
onSuccess: () => router.visit(route('docentes.index')),
});
} else {
// Lógica de creación (POST)
post(route('docentes.store'), {
onSuccess: () => router.visit(route('docentes.index')),
});
}
};

return (
<form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl">
<h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">{title}</h1>

{/* Campo Nombre */}
<div className="mb-4">
<label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
<input
id="nombre"
type="text"
value={data.nombre}
onChange={(e) => setData('nombre', e.target.value)}
className={`mt-1 block w-full rounded-md border p-2 shadow-sm ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
required
/>
{errors.nombre && <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>}
</div>

{/* Campo Apellido */}
<div className="mb-4">
<label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
<input
id="apellido"
type="text"
value={data.apellido}
onChange={(e) => setData('apellido', e.target.value)}
className={`mt-1 block w-full rounded-md border p-2 shadow-sm ${errors.apellido ? 'border-red-500' : 'border-gray-300'}`}
required
/>
{errors.apellido && <div className="text-red-500 text-sm mt-1">{errors.apellido}</div>}
</div>

{/* Campo Email */}
<div className="mb-4">
<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
<input
id="email"
type="email"
value={data.email}
onChange={(e) => setData('email', e.target.value)}
className={`mt-1 block w-full rounded-md border p-2 shadow-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
required
/>
{errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
</div>

{/* Campo Carrera (Select) */}
<div className="mb-6">
<label htmlFor="idcarrera" className="block text-sm font-medium text-gray-700">Carrera</label>
<select
id="idcarrera"
value={data.idcarrera}
onChange={(e) => setData('idcarrera', parseInt(e.target.value))} // Convertir a número
className={`mt-1 block w-full rounded-md border p-2 shadow-sm ${errors.idcarrera ? 'border-red-500' : 'border-gray-300'}`}
required
>
<option value="">-- Seleccionar Carrera --</option>
{carreras.map((carrera) => (
<option key={carrera.idcarrera} value={carrera.idcarrera}>
{carrera.nombre} ({carrera.turno})
</option>
))}
</select>
{errors.idcarrera && <div className="text-red-500 text-sm mt-1">{errors.idcarrera}</div>}
</div>

{/* Botones de Acción */}
<div className="flex justify-end space-x-3 pt-4 border-t">
<button 
type="button" 
onClick={() => router.visit(route('docentes.index'))}
className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition duration-150"
>
Cancelar
</button>
<button 
type="submit"
className={`py-2 px-4 rounded-lg text-sm font-medium text-white transition duration-150 ${processing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'}`}
disabled={processing}
>
{processing ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear')}
</button>
</div>
</form>
);
};

export default DocenteForm;