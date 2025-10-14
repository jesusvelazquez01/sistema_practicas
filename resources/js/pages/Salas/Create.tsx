
import AppLayout from '@/layouts/app-layout';
import {  type BreadcrumbItem } from '@/types';

import { Head} from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salas',
        href: '/salas',
    },
    {
        title: 'Crear',
        href: '',
    },
];

export default function Create() {
  

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Sala" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                
            </div>
        </AppLayout>
    );
}