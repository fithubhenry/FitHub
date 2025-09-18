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
  imageUrl?: string;
  estado?: boolean;

}

export interface IRegisterUser {
  nombre: string;
  apellido: string;
  password: string;
  confirmPassword: string;
  telefono: number;
  fecha_nacimiento: string;
  email: string;
  direccion: string;
  ciudad: string;
}


export interface ILoginUser {
  email: string;
  password: string;
}

export interface GoogleButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
}

export type User = {
  userId: string;
  email: string;
  esAdmin: boolean;
  estado: 'Activo' | 'Inactivo' | 'Suspendido' | 'Invitado';
  nombre?: string;
  apellido?: string;
  telefono?: number | string;
  fecha_nacimiento?: string;
  direccion?: string;
  ciudad?: string;
  correo?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
};