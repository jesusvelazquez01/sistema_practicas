import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PageProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Plus, Pencil, Trash2, List } from 'lucide-react';
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
import elementos from '@/routes/elementos';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Elementos',
        href: '/elementos',
    },
];

export default function Index() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState<number | null>(null);
    const [selectedElemento, setSelectedElemento] = useState<any | null>(null);

    const { elementos: elementosData } = usePage<PageProps>().props;

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'nombre',
            header: 'Nombre',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{row.original.nombre}</span>
                </div>
            ),
        },
        {
            accessorKey: 'marca',
            header: 'Marca',
        },
        {
            accessorKey: 'cantidad',
            header: 'Cantidad',
        },
        {
            accessorKey: 'estado',
            header: 'Estado',
        },
        {
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => {
                const elemento = row.original;
                return (
                    <div className="flex gap-2">
                        <Link href={elementos.edit(elemento.idelementos).url}>
                            <Button size="sm" variant="default">
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                setRecordIdToDelete(elemento.idelementos);
                                setSelectedElemento(elemento);
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
            <Head title="Elementos" />

            <div className="min-h-screen bg-gradient-to-br p-3">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="text-align-left">
                        <h1 className="text-2xl font-bold bg-gradient-to-r bg-blue-400 bg-clip-text text-transparent flex items-center gap-2">
                            <List className="h-5 w-5 text-blue-400" />
                            Gestión de Elementos
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Administra y visualiza todos los elementos registrados
                        </p>
                    </div>

                    <Card className="shadow-lg border-2 dark:border-blue-900">
                        <CardContent className="p-6">
                            <Link href={elementos.create.url()}>
                                <Button className="gap-2 bg-blue-500 hover:bg-blue-600">
                                    <Plus className="h-4 w-4" />
                                    Crear Elemento
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-2 dark:border-blue-900">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-400">
                                <Package className="h-5 w-5 text-blue-400" />
                                Lista de Elementos
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-6">
                            <DataTable
                                columns={columns}
                                data={elementosData.data}
                                pagination={{
                                    from: elementosData.from,
                                    to: elementosData.to,
                                    total: elementosData.total,
                                    links: elementosData.links,
                                    OnPageChange: handlePageChange,
                                }}
                            />
                        </CardContent>
                    </Card>

                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar elemento?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {selectedElemento && (
                                        <>
                                            El elemento <strong>{selectedElemento.nombre}</strong> será eliminado
                                            permanentemente.
                                        </>
                                    )}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        if (recordIdToDelete) {
                                            router.delete(elementos.destroy(recordIdToDelete).url, {
                                                onSuccess: () => {
                                                    setIsDialogOpen(false);
                                                    setRecordIdToDelete(null);
                                                    setSelectedElemento(null);
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
