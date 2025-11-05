import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import docentes from '@/routes/docentes';
import { type BreadcrumbItem, type PageProps, type Docente, type Carrera } from '@/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Docentes', href: docentes.index.url() },
    { title: 'Editar', href: '#' },
];

export default function Edit() {
    const { docente, carreras } = usePage<PageProps<{ docente: Docente; carreras: Carrera[] }>>().props;

    // useForm con datos iniciales
    const { data, setData, put, processing, errors, reset } = useForm({
        nombre: docente.nombre,
        apellido: docente.apellido,
        email: docente.email,
        carrera_id: String(docente.carrera_id),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(docentes.update(docente.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                router.visit(docentes.index.url());
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Docente: ${docente.nombre} ${docente.apellido}`} />

            <div className="min-h-screen bg-gradient-to-br p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Encabezado */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold bg-blue-400 bg-clip-text text-transparent">
                            Editar Docente
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
                                <Save className="h-5 w-5" />
                                Actualizar Datos
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Nombre */}
                                <div>
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input
                                        id="nombre"
                                        value={data.nombre || ''}
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
                                        value={data.apellido || ''}
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
                                        value={data.email || ''}
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
                                        disabled={processing}
                                    >
                                        Revertir cambios
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-400 text-white"
                                        disabled={processing}
                                    >
                                        Guardar Cambios
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
