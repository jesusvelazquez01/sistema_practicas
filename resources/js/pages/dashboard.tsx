import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { ChartContainer } from '@/components/ui/chart';
import { type BreadcrumbItem, PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { LineChart } from 'recharts/types/chart/LineChart';
import { LayoutDashboard, Calendar, Boxes } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const {props} = usePage<PageProps>();
    const salas = props.salas
    const reservas = props.reservas;
    const elementos = props.elementos;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Panel de Control" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Salas Card */}
                    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Salas
                            </CardTitle>
                            <LayoutDashboard className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{salas}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total registradas</p>
                        </CardContent>
                    </Card>

                    {/* Reservas Card */}
                    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Reservas
                            </CardTitle>
                            <Calendar className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{reservas}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total realizadas</p>
                        </CardContent>
                    </Card>

                    {/* Elementos Card */}
                    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Elementos
                            </CardTitle>
                            <Boxes className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{elementos}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total registrados</p>
                        </CardContent>
                    </Card>
                </div>
                <Card className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                </Card>
            </div>
        </AppLayout>
    );
}
