
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import {  type BreadcrumbItem} from '@/types';
import {turno} from '@/constants/estados';
import { Head, router, useForm} from '@inertiajs/react';
import { CheckCircle2, Loader2, Plus } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useState } from 'react';
import carreras from '@/routes/carreras';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Carreras',
        href: '/carreras',
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
    'turno': '',
  });
  //Este es para poder mostrar el cartel si hay algun dato cargado, se activa para mostrar
 const [mostrarCartelCancelar,setMostrarCartelCancelar]= useState(false);

   
    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        post(carreras.store().url);
    };

    const handleCancel = () => {
      //Aca este if dice, si hay algun nombre o disponibilidad cargado en el evento del handleCancel, mostra el cartel
      //por eso es que dice setMostrarCartelCancelar(true)
        if (data.nombre || data.turno) {
            setMostrarCartelCancelar(true);
        } else {
          //Si no hay nada directamente cuando le doy clic al boton cancelar voy directamente a salas.index
            router.visit(carreras.index().url);
        }
    };
    const confirmCancel = () => {
            router.visit(carreras.index().url);
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
            Alta de Carrera
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Registra la información de las carreras disponibles
          </p>
        </div>

        {/* Card principal */}
        <form onSubmit={handleSubmit}>
          <Card className="shadow-lg border-2 border-orange-100 dark:border-blue-900">
            <CardHeader className="bg-gradient-to-r">
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <CheckCircle2 className="h-5 w-5 text-blue-400" />
                Información de la Carrera
              </CardTitle>
              <CardDescription>
                Completa los campos para poder dar de alta una nueva carrera.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-base font-semibold">
                  Nombre de la Carrera
                </Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Tec. Sup. en Desarrollo de Software"
                  value={data.nombre}
                  onChange={(e) => setData('nombre', e.target.value)}
                  disabled={processing}
                  className="focus-visible:ring-orange-50"
                />
                {errors.nombre && (
                  <p className="text-sm text-red-500">{errors.nombre}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="turno">Turno</Label>
                <Select
                  value={data.turno}
                  onValueChange={(value) => setData('turno', value)}
                  disabled={processing}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un turno..." />
                  </SelectTrigger>
                  <SelectContent>
                    {turno.map((turno) => (
                      <SelectItem key={turno.value} value={turno.value}>
                        {turno.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-wrap gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="gap-2 bg-white"
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
                  className="gap-2"
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
        </form>
      </div>
    </div>
        </AppLayout>
    );
}