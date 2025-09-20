import Cookies from "js-cookie";

export type EstadoTurno = "PENDIENTE" | "CONFIRMADO" | "CANCELADO";

export type CrearTurnoDTO = {
  usuarioId: string;
  claseId: string;
  fecha: string;       // YYYY-MM-DD
  horaInicio: string;  // HH:mm:ss
  horaFin: string;     // HH:mm:ss
};

const APIURL = process.env.NEXT_PUBLIC_API_URL!;

async function crear(dto: CrearTurnoDTO) {
  const token = Cookies.get("token");
  const res = await fetch(`${APIURL}/turnos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(dto),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error al crear turno");
  }
  return res.json();
}

// (opcionales)
async function mis(usuarioId: string) {
  const token = Cookies.get("token");
  const res = await fetch(`${APIURL}/turnos/usuario/${usuarioId}`, {
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!res.ok) throw new Error("Error al obtener turnos");
  return res.json();
}
async function actualizarEstado(id: string, estado: EstadoTurno) {
  const token = Cookies.get("token");
  const res = await fetch(`${APIURL}/turnos/${id}/estado`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ estado }),
  });
  if (!res.ok) throw new Error("No se pudo actualizar estado");
  return res.json();
}
async function cancelar(id: string) {
  return actualizarEstado(id, "CANCELADO");
}

const TurnosService = { crear, mis, actualizarEstado, cancelar };
export default TurnosService;               // 👈👈 clave
export { crear, mis, actualizarEstado, cancelar }; // opcional
