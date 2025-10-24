import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Sala, PageProps } from '@/types';
import salas from '@/routes/salas';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, DoorOpen, Pencil, Trash2, Plus, List } from 'lucide-react';
import { useState } from 'react';
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle 
} from '@/components/ui/alert-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salas',
        href: '/salas',
    },
];

export default function Index() {
    // Estado para abrir y cerrar el cartel de diálogo, está en false por defecto
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // Estado para confirmar la eliminación de la sala
    const [recordIdToDelete, setRecordIdToDelete] = useState<number | null>(null);
    // Estado para mostrar información de la sala seleccionada
    const [selectedSala, setSelectedSala] = useState<Sala | null>(null);
    
    // Tipado correcto y extracción de datos paginados
    const { sala } = usePage<PageProps>().props;

    const columns: ColumnDef<Sala>[] = [
        {
            accessorKey: 'nombre',
            header: 'Nombre',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <DoorOpen className="h-4 w-4 text-blue-500" />
                    <div>
                        <p className="font-medium">
                            {row.original.nombre}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'disponibilidad',
            header: 'Disponibilidad',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-500" />
                    <div>
                        <p className="font-medium">
                            {row.original.disponibilidad}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => {
                const salaItem = row.original;
                return (
                    <div className='flex gap-2'>
                        {/* Link con ID para editar */}
                        <Link href={salas.edit(salaItem.id).url}>
                            <Button size="sm" variant="default">
                                <Pencil className='h-4 w-4'/>
                            </Button>
                        </Link>
                        {/* Botón de eliminar */}
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                setRecordIdToDelete(salaItem.id);
                                setSelectedSala(salaItem);
                                setIsDialogOpen(true);
                            }}
                        >
                            <Trash2 className='h-4 w-4'/>
                        </Button>
                    </div>
                );
            },
        },
    ];

    // Handler para cambios de página
    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(url, {}, { 
                preserveState: true, 
                preserveScroll: true 
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Salas" />
            
            <div className="min-h-screen bg-gradient-to-br p-3">
                <div className="max-w-7xl mx-auto space-y-6">
                    
                    {/* Header principal */}
                    <div className="text-align-left">
                        <h1 className="text-2xl font-bold bg-gradient-to-r bg-blue-400 bg-clip-text text-transparent flex items-center gap-2">
                            <List className="h-5 w-5 text-blue-400" />
                            Gestión de Salas
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Administra y visualiza todas las salas disponibles
                        </p>
                    </div>

                    {/* Card con botón de crear */}
                    <Card className="shadow-lg border-2  dark:border-blue-900">
                        <CardContent className="p-6">
                            <Link href={salas.create.url()}>
                                <Button className="gap-2 bg-blue-500 hover:bg-blue-600">
                                    <Plus className="h-4 w-4" />
                                    Crear Sala
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Card principal con la tabla */}
                    <Card className="shadow-lg border-2 dark:border-blue-900">
                        <CardHeader className="bg-gradient-to-r">
                            <CardTitle className="flex items-center gap-2 text-blue-400">
                                <DoorOpen className="h-5 w-5 text-blue-400" />
                                Lista de Salas
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-6">
                            <DataTable
                                columns={columns}
                                data={sala.data}
                                pagination={{
                                    from: sala.from,
                                    to: sala.to,
                                    total: sala.total,
                                    links: sala.links,
                                    OnPageChange: handlePageChange
                                }}
                            />
                        </CardContent>
                    </Card>

                    {/* Dialog de confirmación de eliminación */}
                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro que deseas eliminar?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {selectedSala && (
                                        <>
                                            La sala <strong>{selectedSala.nombre}</strong> será eliminada totalmente del sistema.
                                            Esta acción no se puede deshacer.
                                        </>
                                    )}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        if (recordIdToDelete) {
                                            router.delete(salas.destroy(recordIdToDelete).url, {
                                                onSuccess: () => {
                                                    setIsDialogOpen(false);
                                                    setRecordIdToDelete(null);
                                                    setSelectedSala(null);
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