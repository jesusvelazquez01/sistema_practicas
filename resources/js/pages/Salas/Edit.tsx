
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import {  PageProps, Sala, type BreadcrumbItem} from '@/types';
import {disponibilidad} from '@/constants/estados';
import { Head, router, useForm} from '@inertiajs/react';
import { CheckCircle2, Loader2, Pencil } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useState } from 'react';
import salas from '@/routes/salas';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props  {
  sala: Sala;
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salas',
        href: '/salas',
    },
    {
        title: 'Editar',
        href: '',
    },
];

export default function Edit({ sala }: Props) {
  // Inicializamos el formulario con los datos de la sala que recibimos como prop
  const { data, setData, put, processing, errors } = useForm({
    nombre: sala.nombre || '',
    disponibilidad: sala.disponibilidad as 'disponible' | 'ocupada' | 'mantenimiento' || 'disponible',
  });
  //Este es para poder mostrar el cartel si hay algun dato cargado, se activa para mostrar
 const [mostrarCartelCancelar,setMostrarCartelCancelar]= useState(false);

   
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Usamos put para actualizar el recurso existente
        put(salas.update(sala.id).url);
    };

    const handleCancel = () => {
      //Aca este if dice, si hay algun nombre o disponibilidad cargado en el evento del handleCancel, mostra el cartel
      //por eso es que dice setMostrarCartelCancelar(true)
        if (data.nombre || data.disponibilidad) {
            setMostrarCartelCancelar(true);
        } else {
          //Si no hay nada directamente cuando le doy clic al boton cancelar voy directamente a salas.index
            router.visit(salas.index().url);
        }
    };
    const confirmCancel = () => {
            router.visit(salas.index().url);
        };
    return (
        //AppLayout se encarga de basicamente de decirle que todo el contenido va a estar dentro del marco del header 
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* Header es el titulo de la pagina  */}
            <Head title="Editar Sala" />
             <div className="min-h-screen bg-gradient-to-br p-3">
            <div className="max-w-7xl mx-auto space-y-6">
        {/* Header principal */}
        <div className="text-align-left">
            <h1 className="text-2xl font-bold bg-gradient-to-r bg-blue-400 bg-clip-text text-transparent flex items-center gap-2">
              <Pencil className="h-5 w-5 text-blue-400" />
              Editar Sala
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Modifica la información de la sala seleccionada
            </p>
        </div>

        {/* Card principal */}
        <Card className="shadow-lg border-2 border-orange-100 dark:border-blue-900">
          <CardHeader className="bg-gradient-to-r">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <CheckCircle2 className="h-5 w-5 text-blue-400" />
              Editar Información de la Sala
            </CardTitle>
            <CardDescription>
              Modifica los campos necesarios y guarda los cambios.
            </CardDescription>
          </CardHeader>

          
            <CardContent className="space-y-6 pt-6">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-base font-semibold">
                  Nombre de la Sala
                </Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Gabinete Informatico"
                  value={data.nombre}
                  onChange={(e) => setData('nombre', e.target.value)}
                  disabled={processing}
                  className="focus-visible:ring-orange-50"
                />
                {errors.nombre && (
                  <p className="text-sm text-red-500">{errors.nombre}</p>
                )}
              </div>
              

              <Label htmlFor="disponibilidad">Área</Label>
              <Select
                value={data.disponibilidad}
                onValueChange={(value) => setData('disponibilidad', value)}
                disabled={processing}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un área..." />
                </SelectTrigger>
                <SelectContent>
                  {disponibilidad.map((disponibilidad) => (
                    <SelectItem key={disponibilidad.value} value={disponibilidad.value}>
                      {disponibilidad.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Botones de Acción */}
              <div className="flex flex-wrap gap-3 justify-end pt-6 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="gap-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Cancelar
                </Button>
                
                <AlertDialog open={mostrarCartelCancelar} onOpenChange={setMostrarCartelCancelar}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Descartar cambios?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tienes datos sin guardar. ¿Estás seguro de salir sin guardar los cambios?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Seguir editando</AlertDialogCancel>
                      <AlertDialogAction onClick={confirmCancel}>
                        Descartar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
                <Button
                  type="submit"
                  disabled={processing}
                  onClick={handleSubmit}
                  className="gap-2 bg-blue-400 dark:bg-blue-400"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Guardando...
                    </div>
                  ) : (
                    'Guardar'
                  )}
                </Button>
              </div>
            </CardContent>
        </Card>
      </div>
    </div>
        </AppLayout>
    );
}