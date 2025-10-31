import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { format, parseISO } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Sala {
    id: number;
    nombre: string;
    disponibilidad: boolean;
}

interface DocenteOption {
    value: number;
    label: string;
}

interface CalendarEvent extends EventInput {
    id: string;
    sala_id: number;
    docente_id: number;
    fecha: string;
    hora_entrada: string;
    hora_salida: string;
}

const breadcrumbs = [
    { title: 'Reservas', href: '/reservas' },
    { title: 'Calendario', href: '#' },
]

interface CalendarPageProps {
    sala: Sala;
    events: CalendarEvent[];
    docentes: DocenteOption[];
}

export default function Calendar() {
    const { props } = usePage<{ props: CalendarPageProps }>();
    const { sala, events, docentes } = props as unknown as CalendarPageProps;
    const [currentView, setCurrentView] = useState('dayGridMonth');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<DateSelectArg | null>(null);
    const [formData, setFormData] = useState({
        docente_id: '',
        fecha: '',
        hora_entrada: '',
        hora_salida: ''
    });
    const calendarRef = useRef<FullCalendar>(null);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        setSelectedEvent(selectInfo);
        setFormData({
            docente_id: '',
            fecha: format(selectInfo.start, 'yyyy-MM-dd'),
            hora_entrada: format(selectInfo.start, 'HH:mm'),
            hora_salida: format(selectInfo.end, 'HH:mm')
        });
        setShowCreateDialog(true);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        if (confirm(`¿Estás seguro de que quieres eliminar la reserva '${clickInfo.event.title}'?`)) {
            router.delete(`/reservas/${clickInfo.event.id}`, {
                onSuccess: () => {
                    clickInfo.event.remove();
                },
                preserveScroll: true
            });
        }
    };

    const handleCreateReserva = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedEvent) return;

        const data = {
            ...formData,
            sala_id: sala.id,
            fecha: formData.fecha,
            hora_entrada: formData.hora_entrada,
            hora_salida: formData.hora_salida
        };

        router.post('/reservas', data, {
            onSuccess: () => {
                setShowCreateDialog(false);
                // Recargar el calendario para mostrar la nueva reserva
                if (calendarRef.current) {
                    const calendarApi = calendarRef.current.getApi();
                    calendarApi.refetchEvents();
                }
            },
            preserveScroll: true
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Calendario - ${sala.nombre}`} />
            
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="icon" asChild>
                                <Link href="/reservas">
                                    <ChevronLeft className="h-4 w-4" />
                                </Link>
                            </Button>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {sala.nombre}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Gestiona las reservas de esta sala
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <div className="h-[700px]">
                                <FullCalendar
                                    ref={calendarRef}
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                    }}
                                    initialView={currentView}
                                    events={events}
                                    nowIndicator={true}
                                    editable={true}
                                    selectable={true}
                                    selectMirror={true}
                                    select={handleDateSelect}
                                    eventClick={handleEventClick}
                                    locale="es"
                                    buttonText={{
                                        today: 'Hoy',
                                        month: 'Mes',
                                        week: 'Semana',
                                        day: 'Día',
                                    }}
                                    slotMinTime="08:00:00"
                                    slotMaxTime="20:00:00"
                                    allDaySlot={false}
                                    weekends={true}
                                    eventTimeFormat={{
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    }}
                                />
                                
                                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Nueva Reserva</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleCreateReserva} className="space-y-4">
                                            <div>
                                                <Label htmlFor="docente_id">Docente</Label>
                                                <Select
                                                    name="docente_id"
                                                    value={formData.docente_id}
                                                    onValueChange={(value) => 
                                                        setFormData(prev => ({ ...prev, docente_id: value }))
                                                    }
                                                    required
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccione un docente" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {docentes.map((docente) => (
                                                            <SelectItem key={docente.value} value={String(docente.value)}>
                                                                {docente.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            
                                            <div>
                                                <Label htmlFor="fecha">Fecha</Label>
                                                <Input
                                                    type="date"
                                                    name="fecha"
                                                    value={formData.fecha}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="hora_entrada">Hora de entrada</Label>
                                                    <Input
                                                        type="time"
                                                        name="hora_entrada"
                                                        value={formData.hora_entrada}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="hora_salida">Hora de salida</Label>
                                                    <Input
                                                        type="time"
                                                        name="hora_salida"
                                                        value={formData.hora_salida}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="flex justify-end space-x-2 pt-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setShowCreateDialog(false)}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button type="submit">
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Crear Reserva
                                                </Button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
