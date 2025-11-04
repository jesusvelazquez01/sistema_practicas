import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, PageProps } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { LayoutDashboard, Calendar, Boxes, ArrowRight } from 'lucide-react';
import salas from '@/routes/salas';
import reservas from '@/routes/reservas';
import elementos from '@/routes/elementos';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const {props} = usePage<PageProps>();
    const salasCount = props.salas;
    const reservasCount = props.reservas;
    const elementosCount = props.elementos;

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
                                        {salasCount}
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
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                Reservas
                            </CardTitle>
                            <div className="relative">
                                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:scale-110" />
                                <div className="absolute inset-0 text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                            </div>
                        </CardHeader>
                        
                        <CardContent className="relative z-10">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-3xl font-bold group-hover:scale-105 transition-transform duration-300 inline-block">
                                        {reservasCount}
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
                                        {elementosCount}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Total registrados</p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                        </CardContent>

                        <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
                    </Card>
                </div>
                
                <Card className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                </Card>
            </div>
        </AppLayout>
    );
}

