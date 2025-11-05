import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus } from 'lucide-react';
import { type BreadcrumbItem, PageProps } from '@/types';
import docentes from '@/routes/docentes';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Docentes', href: '/docentes' },
    { title: 'Crear', href: '/docentes/create' },
];

export default function Create() {
    const { carreras } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        apellido: '',
        email: '',
        carrera_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(docentes.store.url(), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registrar Docente" />

            <div className="min-h-screen bg-gradient-to-br p-3">
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Encabezado */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold bg-blue-400 bg-clip-text text-transparent">
                            Registrar Nuevo Docente
                        </h1>
                        <Link href={docentes.index.url()}>
                            <Button variant="outline" className="gap-2">
                                <ArrowLeft className="h-4 w-4" /> Volver
                            </Button>
                        </Link>
                    </div>

                    {/* Tarjeta principal */}
                    <Card className="shadow-lg border-2 dark:border-blue-900">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-400">
                                <Plus className="h-5 w-5" />
                                Nuevo Docente
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Nombre */}
                                <div>
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input
                                        id="nombre"
                                        placeholder="Ej: Juan"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                    />
                                    {errors.nombre && (
                                        <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                                    )}
                                </div>

                                {/* Apellido */}
                                <div>
                                    <Label htmlFor="apellido">Apellido</Label>
                                    <Input
                                        id="apellido"
                                        placeholder="Ej: Pérez"
                                        value={data.apellido}
                                        onChange={(e) => setData('apellido', e.target.value)}
                                    />
                                    {errors.apellido && (
                                        <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Ej: juan.perez@example.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Carrera */}
                                <div>
                                    <Label htmlFor="carrera_id">Carrera</Label>
                                    <Select
                                        value={data.carrera_id}
                                        onValueChange={(value) => setData('carrera_id', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una carrera" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {carreras.map((carrera) => (
                                                <SelectItem key={carrera.id} value={String(carrera.id)}>
                                                    {carrera.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.carrera_id && (
                                        <p className="text-red-500 text-sm mt-1">{errors.carrera_id}</p>
                                    )}
                                </div>

                                {/* Botones */}
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => reset()}
                                    >
                                        Limpiar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-400 text-white"
                                        disabled={processing}
                                    >
                                        Guardar Docente
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
