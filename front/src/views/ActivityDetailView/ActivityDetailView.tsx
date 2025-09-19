"use client";

import { IClase } from "@/types";
import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import TurnosService from "@/services/turnos";

const intensityStyles: Record<IClase["intensidad"], string> = {
  "muy alta": "bg-red-100 text-black",
  alta: "bg-orange-100 text-black",
  media: "bg-yellow-100 text-black",
  baja: "bg-green-100 text-black",
};

export default function ActivityDetailView({ clase }: { clase: IClase }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  if (!clase) return <div className="p-6">Clase no encontrada</div>;

  const canReserve = isAuthenticated && user?.estado === "Activo";

  // 🔧 Normalizamos un slot único (fecha + horaInicio) igual que en la card
  const slot = (() => {
    const hi = clase.horaInicio ?? clase.horario;
    if (clase.fecha && hi) return { fecha: clase.fecha, horaInicio: hi };
    if (Array.isArray(clase.horarios) && clase.horarios.length > 0) {
      const h = clase.horarios[0];
      return { fecha: h.fecha, horaInicio: h.horaInicio };
    }
    return null;
  })();

  const disabled = !canReserve || !slot;

  async function reservar() {
  if (!isAuthenticated) return router.push("/login");

  const usuarioId = (user as any)?.id ?? (user as any)?.userId ?? (user as any)?.sub;

  const fechaISO = (clase.fecha ?? "").slice(0, 10);
  const hRaw = clase.horaInicio ?? clase.horario ?? "";
  const horaInicioFmt = hRaw.length === 5 ? `${hRaw}:00` : hRaw;

  if (!usuarioId) return toast.error("No se encontró tu ID de usuario");
  if (!fechaISO || !horaInicioFmt) return toast.error("La clase no tiene fecha/horario definido");

  try {
    await TurnosService.crear({
      usuarioId,
      claseId: clase.id,
      fecha: fechaISO,
      horaInicio: horaInicioFmt,
      estado: "PENDIENTE", // <- NUEVO
      descripcion: `Reserva de ${clase.nombre} - ${fechaISO} ${horaInicioFmt}`, // <- NUEVO
    });
    toast.success("¡Reserva realizada!");
    router.push("/misTurnos");
  } catch (err: any) {
    toast.error(err?.message ?? "No se pudo reservar");
  }
}


  return (
    <div className="mt-10 max-w-5xl mx-auto p-6 bg-white rounded-xl shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={clase.imageUrl || "/placeholder.svg"}
            alt={clase.nombre}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{clase.nombre}</h2>
          <p className="text-gray-700">{clase.descripcion}</p>

          <div className="flex gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {clase.duracion}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {clase.participantes} inscriptos
            </span>
          </div>

          <div className="mt-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${intensityStyles[clase.intensidad]}`}
            >
              Intensidad: {clase.intensidad}
            </span>
          </div>

          <div className="text-sm text-gray-600">
            <p>Instructor: {clase.instructor}</p>
            <p>Fecha: {slot?.fecha ?? "-"}</p>
            <p>Horario: {slot?.horaInicio ?? "-"}</p>
            <p>Tipo: {clase.tipo}</p>
            <p>Grupo muscular: {clase.grupo_musculo}</p>
            <p>Músculo específico: {clase.sub_musculo}</p>
            <p>Sede: {clase.sede}</p>
          </div>

          <button
            type="button"
            disabled={disabled}
            onClick={reservar}
            className={`mt-3 w-full rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50
              ${
                disabled
                  ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                  : "bg-[#fee600] text-black hover:bg-black hover:text-[#fee600]"
              }`}
          >
            {canReserve ? "Reservar Clase" : "Solo Premium"}
          </button>
        </div>
      </div>
    </div>
  );
}


