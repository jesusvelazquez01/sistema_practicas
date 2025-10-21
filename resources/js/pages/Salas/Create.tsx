
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import {  type BreadcrumbItem} from '@/types';
import {disponibilidad} from '@/constants/estados';
import { Head, router, useForm} from '@inertiajs/react';
import { CheckCircle2, Loader2, Plus } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useState } from 'react';
import SalaController from '@/actions/App/Http/Controllers/SalaController';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  //Bien en react comun sin inertia cada vez que mandamos un dato se esta creando un evento en nuestro componente
  //cada vez que hacemos esto se usa UseState por ejemplo
  //tenemos el un formulario de salas con nombre y disponilibidad 
  //entonces tendriamos que hacer una funcion UseState para nombre y para disponilibidad 
  //con Inertia hay una funcion que se llama UserForm() que es la que se encarga de los eventos del componente en lo que se refiere a 
  //formularios

  const {data,setData, post, processing, errors } = useForm({
    'nombre': '',
    'disponibilidad': '',
  });
 const [mostrarCartelCancelar,setMostrarCartelCancelar]= useState(false);

   
    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        post(SalaController.store().url);
    };

    const handleCancel = () => {
        if (data.nombre || data.disponibilidad) {
            setMostrarCartelCancelar(true);
        } else {
            router.visit(SalaController.index().url);
        }
    };
    const confirmCancel = () => {
            router.visit(SalaController.index().url);
        };
    return (
        //AppLayout se encarga de basicamente de decirle que todo el contenido va a estar dentro del marco del header 
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* Header es el titulo de la pagina  */}
            <Head title="Crear Sala" />
             <div className="min-h-screen bg-gradient-to-br p-3">
            <div className="max-w-7xl mx-auto space-y-6">
        {/* Header principal */}
        <div className="text-align-left">
          <h1 className="text-2xl font-bold bg-gradient-to-r bg-blue-400 bg-clip-text text-transparent flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-400" />
            Alta de Sala
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Registra la información de las salas disponibles
          </p>
        </div>

        {/* Card principal */}
        <Card className="shadow-lg border-2 border-orange-100 dark:border-blue-900">
          <CardHeader className="bg-gradient-to-r">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <CheckCircle2 className="h-5 w-5 text-blue-400" />
              Información de la Sala
            </CardTitle>
            <CardDescription>
              Completa los campos para poder dar de alta una nueva sala.
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

            
            </CardContent>
        </Card>
           {/* Botones de Acción */}
            <Card className="shadow-lg border-2">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3 justify-end">
                   <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="gap-2  bg-white"
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
                  onClick={handleSubmit}
                  type="submit"
                  disabled={processing}
                  className="gap-2 "
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