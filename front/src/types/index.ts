export interface IClase {
    id: string;
    nombre: string;
    descripcion: string;
    intensidad: "muy alta" | "alta" | "media" | "baja";
    instructor: string;
    horario: string;
    duracion: string;
    capacidad: number;
    participantes: number;
    tipo: "Yoga" | "Crossfit" | "Spinning" | "Pilates" | "Zumba" | "Boxeo" | "Funcional";
    grupo_musculo: "Pierna" | "Brazos" | "Abdomen" | "Espalda" | "Glúteos" | "Cardio";
    sub_musculo: "biceps" | "triceps" | "cuadriceps" | "abdominal" | "gluteo" | "dorsal" | "pectoral";
    sede: string;
    image: string;
    
}

export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}
