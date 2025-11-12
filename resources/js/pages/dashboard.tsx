import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type PageProps, type ReservaPorSala, type DocenteConReservas } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { LayoutDashboard, Calendar, Boxes, ArrowRight, TrendingUp } from 'lucide-react';
import salas from '@/routes/salas';
import reservas from '@/routes/reservas';
import elementos from '@/routes/elementos';
//charts
import { Pie, PieChart, BarChart, CartesianGrid, XAxis, YAxis, Bar, BarProps } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Extender la interfaz de las props de Page para incluir stats
declare module '@inertiajs/core' {
  interface PageProps {
    stats: {
      total_salas: number;
      total_reservas: number;
      total_elementos: number;
      reservas_por_sala: ReservaPorSala[];
      docentes_con_reservas: DocenteConReservas[];
    };
    [key: string]: any; // Firma de índice para compatibilidad con Inertia
  }
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: dashboard().url,
    },
];
const colors = ['#2662d9', '#2EB88A', '#E23670'];
export default function Dashboard() {
    const { stats } = usePage<PageProps>().props;
    
    // Datos para el gráfico de pastel (reservas por sala)
    //este codigo ya es generico nomas si usamos un piechardata
    const pieCharData = stats.reservas_por_sala.map((sala: ReservaPorSala, index: number) => ({
        ...sala,
        fill: colors[index % colors.length],
    }));
    
    // Datos para el gráfico de barras (docentes con más reservas)
    const barChartData = stats.docentes_con_reservas.map((docente: DocenteConReservas, index: number) => ({
        ...docente,
        id: docente.id.toString(), // Aseguramos que el id sea string para recharts
        fill: colors[index % colors.length],
        nombre_completo: `${docente.nombre} ${docente.apellido}`.trim()
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Panel de Control" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Salas Card */}
                    <Card
                        className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer border-2 hover:border-primary/50 hover:-translate-y-1"
                        onClick={() => router.visit(salas.index().url)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                Salas
                            </CardTitle>
                            <div className="relative">
                                <LayoutDashboard className="h-5 w-5 text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:scale-110" />
                                <div className="absolute inset-0 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                            </div>
                        </CardHeader>
                        
                        <CardContent className="relative z-10">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-3xl font-bold group-hover:scale-105 transition-transform duration-300 inline-block">
                                        {stats.total_salas}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Total registradas</p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                        </CardContent>

                        <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
                    </Card>

                    {/* Reservas Card */}
                    <Card
                        className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 cursor-pointer border-2 hover:border-primary/50 hover:-translate-y-1"
                        onClick={() => router.visit(reservas.index().url)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                Reservas
                            </CardTitle>
                            <div className="relative">
                                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400 transition-all duration-300 group-hover:scale-110" />
                                <div className="absolute inset-0 text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                            </div>
                        </CardHeader>
                        
                        <CardContent className="relative z-10">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-3xl font-bold group-hover:scale-105 transition-transform duration-300 inline-block">
                                        {stats.total_reservas}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Total realizadas</p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                        </CardContent>

                        <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
                    </Card>

                    {/* Elementos Card */}
                    <Card
                        className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 cursor-pointer border-2 hover:border-primary/50 hover:-translate-y-1"
                        onClick={() => router.visit(elementos.index().url)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                Elementos
                            </CardTitle>
                            <div className="relative">
                                <Boxes className="h-5 w-5 text-orange-600 dark:text-orange-400 transition-all duration-300 group-hover:scale-110" />
                                <div className="absolute inset-0 text-orange-600 dark:text-orange-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                            </div>
                        </CardHeader>
                        
                        <CardContent className="relative z-10">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-3xl font-bold group-hover:scale-105 transition-transform duration-300 inline-block">
                                        {stats.total_elementos}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Total registrados</p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                        </CardContent>

                        <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
                    </Card>
                </div>
                
                {/* Grid responsivo para los gráficos lado a lado */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Gráfico de Pastel - Reservas por Sala */}
                    <Card className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Reservas por Sala</CardTitle>
                            <CardDescription>Año 2025</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer config={{}} className="mx-auto max-h-[300px] w-full md:max-h-[370px]">
                                <PieChart>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                    <Pie
                                        data={pieCharData}
                                        dataKey="total_reservas"
                                        nameKey="nombre"
                                        outerRadius={120}
                                        label={({ name, percent }: { name: string, percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        labelLine={false}
                                    />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 leading-none font-medium">
                                Reservas por sala <TrendingUp className="h-4 w-4" />
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Gráfico de Barras - Reservas por Docente */}
                    <Card className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Reservas por Docente</CardTitle>
                            <CardDescription>Top 5 docentes con más reservas</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer config={{}} className="mx-auto h-[300px] w-full">
                                <BarChart 
                                    data={barChartData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                    layout="vertical"
                                >
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                    <XAxis 
                                        type="number" 
                                        axisLine={false} 
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis 
                                        type="category" 
                                        dataKey="nombre_completo" 
                                        axisLine={false} 
                                        tickLine={false}
                                        width={150}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <ChartTooltip 
                                        cursor={{ fill: 'transparent' }} 
                                        content={<ChartTooltipContent />} 
                                    />
                                    <Bar 
                                        dataKey="total_reservas" 
                                        name="Reservas"
                                        fill="#3b82f6"
                                        radius={[0, 4, 4, 0]}
                                        barSize={20}
                                    >
                                        {barChartData.map((entry, index) => (
                                            <text 
                                                key={`bar-label-${index}`}
                                                x={entry.total_reservas + 5} 
                                                y={index * 30 + 20} 
                                                fill="#6b7280" 
                                                fontSize={12} 
                                                textAnchor="start"
                                            >
                                                {entry.total_reservas}
                                            </text>
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 leading-none font-medium">
                                Reservas por docente <TrendingUp className="h-4 w-4" />
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

