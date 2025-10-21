
import AppLayout from '@/layouts/app-layout';
import {  type BreadcrumbItem } from '@/types';
import salas from '@/routes/salas';
import { Head, Link, usePage} from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salas',
        href: '/salas',
    },
];

export default function Index() {
    //esto me trae los datos del conmtroller cuando ibamos a 'salas' => $salas 
    //entonces me esta trayendo estos datos de la base de datos 

  const {sala} = usePage().props

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Salas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
             <Link href={salas.create.url()}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Crear Sala
                </button>
                <ol>
                    {sala.data.map((sala) => (
                        <li key={sala.id}>
                            {sala.nombre}
                        </li>
                    ))}
                    <li>

                    </li>
                </ol>
             </Link>   
            </div>
        </AppLayout>
    );
}
