
import AppLayout from '@/layouts/app-layout';
import {  type BreadcrumbItem } from '@/types';

import { Head} from '@inertiajs/react';




const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Carreras',
        href: '/Carreras',
    },
     {
        title: 'Editar Carrera',
        href: '',
    },
    
];

export default function Index() {
  

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Carreras" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1>Este es el componente de carreras Indez</h1>
            </div>
        </AppLayout>
    );
}