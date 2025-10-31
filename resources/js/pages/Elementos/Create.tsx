import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus } from 'lucide-react';
import elementos from '@/routes/elementos';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Elementos', href: '/elementos' },
    { title: 'Crear', href: '/elementos/create' },
];

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        marca: '',
        cantidad: 0,
        estado: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(elementos.store.url(), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registrar Elemento" />

            <div className="min-h-screen bg-gradient-to-br p-3">
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Encabezado */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                            Registrar Nuevo Elemento
                        </h1>
                        <Link href={elementos.index.url()}>
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
                                Nuevo Elemento
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Nombre */}
                                <div>
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input
                                        id="nombre"
                                        placeholder="Ej: Notebook"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                    />
                                    {errors.nombre && (
                                        <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                                    )}
                                </div>

                                {/* Marca */}
                                <div>
                                    <Label htmlFor="marca">Marca</Label>
                                    <Input
                                        id="marca"
                                        placeholder="Ej: Samsung"
                                        value={data.marca}
                                        onChange={(e) => setData('marca', e.target.value)}
                                    />
                                    {errors.marca && (
                                        <p className="text-red-500 text-sm mt-1">{errors.marca}</p>
                                    )}
                                </div>

                                {/* Cantidad */}
                                <div>
                                    <Label htmlFor="cantidad">Cantidad</Label>
                                    <Input
                                        id="cantidad"
                                        type="number"
                                        placeholder="Ejemplo: 5"
                                        min={0}
                                        value={data.cantidad}
                                        onChange={(e) => {
                                            let value = e.target.value;

                                            // Evita negativos o texto inválido
                                            if (value.includes('-')) value = value.replace('-', '');
                                            const numericValue = Math.max(0, Number(value) || 0);
                                            setData('cantidad', numericValue);
                                        }}
                                        onKeyDown={(e) => {
                                            if (['-', 'e', 'E', '+'].includes(e.key)) e.preventDefault();
                                        }}
                                    />
                                    {errors.cantidad && (
                                        <p className="text-red-500 text-sm mt-1">{errors.cantidad}</p>
                                    )}
                                </div>

                                {/* Estado */}
                                <div>
                                    <Label htmlFor="estado">Estado</Label>
                                    <Input
                                        id="estado"
                                        placeholder="Ej: Disponible/En reparación..."
                                        value={data.estado}
                                        onChange={(e) => setData('estado', e.target.value)}
                                    />
                                    {errors.estado && (
                                        <p className="text-red-500 text-sm mt-1">{errors.estado}</p>
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
                                        className="bg-blue-500 hover:bg-blue-600 text-white"
                                        disabled={processing}
                                    >
                                        Guardar Elemento
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
