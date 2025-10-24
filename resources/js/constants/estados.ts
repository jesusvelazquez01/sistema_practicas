//Chicos en este archivos de ts van nuestras constantes basicamente si tenemos un select nuestros datos del select van aca
import { Disponibilidad } from "@/types";
import { Turno } from "@/types";
export const disponibilidad:{value: Disponibilidad; label: string}[] = [
     {
        value: "Libre",
        label: "Libre"
    },
    {
        value: "Ocupada",
        label: "Ocupada"
    },
    {
        value: "En Mantenimiento",
        label: "En Mantenimiento"
    }
];
export const turno:{value: Turno; label: string}[] = [
    {
        value: "Mañana",
        label: "Mañana"
    },
    {
        value: "Tarde",
        label: "Tarde"
    },
    {
        value: "Noche",
        label: "Noche"
    }
];