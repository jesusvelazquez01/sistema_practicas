import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
//Crear Interfaces del Proyecto
export interface Docente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    created_at: string;
    updated_at: string;
}
export type  Turno = 'Mañana' | 'Tarde' | 'Noche';
export interface Carrera {
    id: number;
    nombre: string;
    turno: Turno;
    created_at: string;
    updated_at: string;
}
export type Disponibilidad = 'Libre' | 'Ocupada' | 'En Mantenimiento';
export interface Sala {
    id: number;
    nombre: string;
    disponibilidad: Disponibilidad;
    created_at: string;
    updated_at: string;
}
//Para poder usar el datable esto es un copia y pego nomas no hay que tocar nada en esta interfaz
export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}
//Para pasar las props a las o los datatables aca vamos a ir agregando las interfaces que nos falten
//faltaria docentes, elementos mmm carreras y nose cuales mas
export interface PageProps{
    [key:string]: unknown;

sala : PaginatedData<Sala>;
carrera : PaginatedData<Carrera>;
}