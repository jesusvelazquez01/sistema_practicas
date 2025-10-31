import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Definir los tipos necesarios
interface Sala {
    id: number;
    nombre: string;
    disponibilidad: boolean;
}

interface PagePropsWithSalas extends PageProps {
    salas: Sala[];
}

const breadcrumbs = [
    {
        title: 'Reservas',
        href: '/reservas',
    },
];

export default function Index() {
    const { props } = usePage<PagePropsWithSalas>();
    const { salas } = props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Salas de Reuniones" />
            
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Seleccione una sala</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {salas.map((sala) => (
                            <Card key={sala.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{sala.nombre}</CardTitle>
                                            <CardDescription className="flex items-center gap-1 mt-1">
                                                <span className={`inline-block w-2 h-2 rounded-full ${sala.disponibilidad ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {sala.disponibilidad ? 'Disponible' : 'No disponible'}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="py-4">
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Link 
                                        href={`/reservas/create?sala=${sala.id}`}
                                        className="w-full"
                                    >
                                        <Button 
                                            className="w-full" 
                                            disabled={!sala.disponibilidad}
                                        >
                                            Reservar
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
  );
}