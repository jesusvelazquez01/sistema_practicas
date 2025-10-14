
import AppLayout from '@/layouts/app-layout';
import {  type BreadcrumbItem } from '@/types';
import salas from '@/routes/salas';
import { Head, Link} from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salas',
        href: '/salas',
    },
];

export default function Index() {
  

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Salas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
             <Link href={salas.create.url()}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Crear Sala
                </button>
             </Link>   
            </div>
        </AppLayout>
    );
}
