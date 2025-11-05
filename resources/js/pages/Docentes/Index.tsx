import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PageProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; 
import { Users, Plus, Pencil, Trash2, List } from 'lucide-react';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import docentes from '@/routes/docentes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Docentes',
        href: '/docentes',
    },
];

export default function Index() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState<number | null>(null);
    const [selectedDocente, setSelectedDocente] = useState<any | null>(null);

    const { docentes: docentesData } = usePage<PageProps>().props;

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'nombre',
            header: 'Nombre',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{row.original.nombre}</span>
                </div>
            ),
        },
        {
            accessorKey: 'apellido',
            header: 'Apellido',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'carrera',
            header: 'Carrera',
            cell: ({ row }) => (
                <span>{row.original.carrera ? row.original.carrera.nombre : 'N/A'}</span>
            ),
        },
        {
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => {
                const docente = row.original;
                return (
                    <div className="flex gap-2"> 
                        <Link href={docentes.edit(docente.id).url}>
                            <Button size="sm" variant="default">
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                setRecordIdToDelete(docente.id);
                                setSelectedDocente(docente);
                                setIsDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(url, {}, { preserveState: true, preserveScroll: true });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Docentes" />

            <div className="min-h-screen bg-gradient-to-br p-3">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="text-align-left">
                        <h1 className="text-2xl font-bold bg-gradient-to-r bg-blue-400 bg-clip-text text-transparent flex items-center gap-2">
                            <List className="h-5 w-5 text-blue-400" />
                            Gestión de Docentes
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Administra y visualiza todos los docentes registrados
                        </p>
                    </div>

                    <Card className="shadow-lg border-2 dark:border-blue-900">
                        <CardHeader className="bg-gradient-to-r flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-blue-400">
                                <Users className="h-5 w-5 text-blue-400" />
                                Lista de Docentes
                            </CardTitle>
                            <Link href={docentes.create.url()}>
                                <Button className="gap-2 bg-blue-400 hover:bg-blue-400">
                                    <Plus className="h-4 w-4" />
                                    Crear Docente
                                </Button>
                            </Link>
                        </CardHeader>

                        <CardContent className="pt-6">
                            <DataTable
                                columns={columns}
                                data={docentesData.data}
                                pagination={{
                                    from: docentesData.from,
                                    to: docentesData.to,
                                    total: docentesData.total,
                                    links: docentesData.links,
                                    OnPageChange: handlePageChange,
                                }}
                            />
                        </CardContent>
                    </Card>

                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar docente?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {selectedDocente && (
                                        <>
                                            El docente <strong>{selectedDocente.nombre} {selectedDocente.apellido}</strong>{' '}
                                            será eliminado permanentemente.
                                        </>
                                    )}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        if (recordIdToDelete) {
                                            router.delete(docentes.destroy(recordIdToDelete).url, {
                                                onSuccess: () => {
                                                    setIsDialogOpen(false);
                                                    setRecordIdToDelete(null);
                                                    setSelectedDocente(null);
                                                },
                                            });
                                        }
                                    }}
                                >
                                    Eliminar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </AppLayout>
    );
}
