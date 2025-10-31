// resources/js/Pages/Docentes/Index.tsx
import React from 'react';
import { Head, router, Link } from '@inertiajs/react';
// CORRECCIÓN: Apuntamos al archivo 'app-layout' que tienes en tu estructura
import Layout from '@/Layoutss/app-layout'; 

// Necesaria para que TypeScript reconozca el helper de Laravel/Ziggy
declare function route(name: string, params?: any): string; 

// Usamos 'any' para simplificar el tipado de las props que vienen de Laravel
const Index: React.FC<any> = ({ docentes, carreras }) => {

    const handleDelete = (iddocente: number) => {
        if (confirm('¿Estás seguro de eliminar a este docente? Esta acción no se puede deshacer.')) {
            // Llama a la ruta DELETE del controlador de Laravel
            router.delete(route('docentes.destroy', iddocente));
        }
    };

    return (
        <Layout
            // El 'header' se muestra en el layout principal
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestión de Docentes</h2>}
        >
            <Head title="Docentes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-4 md:p-6">
                        
                        {/* Botón de Creación: Redirige a la vista Create.tsx */}
                        <Link 
                            href={route('docentes.create')}
                            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg mb-6 transition duration-150 ease-in-out shadow-md"
                        >
                            + Nuevo Docente
                        </Link>

                        {/* Tabla Responsiva (Oculta columnas en pantallas pequeñas) */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">ID</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Carrera</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Es importante usar 'docentes.data' porque el controlador usa paginate(10) */}
                                    {docentes.data.length === 0 ? ( 
                                        <tr>
                                            <td colSpan={5} className="px-4 py-4 text-center text-gray-500 italic">No hay docentes registrados.</td>
                                        </tr>
                                    ) : (
                                        docentes.data.map((docente: any) => (
                                            <tr key={docente.iddocente} className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{docente.iddocente}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {docente.apellido}, {docente.nombre}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{docente.email}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                                    {docente.carrera?.nombre || 'N/A'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-center">
                                                    <Link 
                                                        href={route('docentes.edit', docente.iddocente)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-2 transition duration-150"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(docente.iddocente)}
                                                        className="text-red-600 hover:text-red-900 transition duration-150"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Index;