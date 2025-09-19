// src/services/turnos.ts
import api from "./api"; // o "./apis"

export type EstadoTurno = "PENDIENTE" | "CONFIRMADO" | "CANCELADO";

export interface CrearTurnoDTO {
  usuarioId: string;
  claseId: string;
  fecha: string;         // "YYYY-MM-DD"
  horaInicio: string;    // "HH:mm:ss"
  estado?: EstadoTurno;  // si el back lo pide obligatorio, lo mandamos
  descripcion?: string;  // <- NUEVO (si el back lo espera)
}

type ClaseLite = { id: string; nombre?: string };

export interface ITurno {
  id: string;
  fecha: string;
  estado: EstadoTurno;
  horaInicio?: string;
  horaFin?: string;
  diaSemana?: string;
  activo: boolean;
  descripcion?: string;   // <- NUEVO
  user: { id: string; email: string; nombre?: string };
  clase: ClaseLite | ClaseLite[];
}

const TurnosService = {
  crear: (dto: CrearTurnoDTO) => api.post("/turnos", dto) as Promise<ITurno>,
  mis: (usuarioId: string)    => api.get(`/turnos/usuario/${usuarioId}`) as Promise<ITurno[]>,
  actualizarEstado: (id: string, estado: EstadoTurno) =>
    api.patch(`/turnos/${id}/estado`, { estado }) as Promise<ITurno>,
  cancelar: (id: string)      => TurnosService.actualizarEstado(id, "CANCELADO"),
};

export default TurnosService;
