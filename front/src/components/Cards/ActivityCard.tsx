"use client";

import { IClase } from "@/types";
import { Clock, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import TurnosService from "@/services/turnos";

type Props = IClase;

const estilosIntensidad: Record<IClase["intensidad"], string> = {
  "muy alta": "bg-red-100 text-black",
  alta: "bg-orange-100 text-black",
  media: "bg-yellow-100 text-black",
  baja: "bg-green-100 text-black",
};

function ActivityCard({
  id,
  nombre,
  descripcion,
  duracion,
  participantes,
  intensidad,
  imageUrl,
  // 👇 ahora existen en el tipo (A):
  fecha,
  horaInicio,
  horario,
  horarios,
}: Props) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const esInvitado = !isAuthenticated;
  const esRegistrado = isAuthenticated && user?.estado === "Invitado";
  const esPremium = isAuthenticated && user?.estado === "Activo";

  const textoBoton = esPremium
    ? "Reservar Clase"
    : esRegistrado
    ? "Solo Premium"
    : "Iniciar sesión";

  const deshabilitado = esRegistrado;

  // 🔧 Normalizamos un "slot" único (fecha + horaInicio):
  const slot = (() => {
    const hi = horaInicio ?? horario; // si viene como "horario"
    if (fecha && hi) return { fecha, horaInicio: hi };
    if (Array.isArray(horarios) && horarios.length > 0) {
      const h = horarios[0];
      return { fecha: h.fecha, horaInicio: h.horaInicio };
    }
    return null;
  })();

  async function manejarClick(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  e.stopPropagation();

  if (esInvitado) return router.push("/login");
  if (esRegistrado) return toast.info("Hazte premium para reservar");

  const usuarioId = (user as any)?.id ?? (user as any)?.userId ?? (user as any)?.sub;

  const fechaISO = (fecha ?? "").slice(0, 10);
  const hRaw = horaInicio ?? horario ?? "";
  const horaInicioFmt = hRaw.length === 5 ? `${hRaw}:00` : hRaw;

  if (!usuarioId) return toast.error("No se encontró tu ID de usuario");
  if (!fechaISO || !horaInicioFmt) return toast.error("La clase no tiene fecha/horario definido");

  try {
    await TurnosService.crear({
      usuarioId,
      claseId: id,
      fecha: fechaISO,
      horaInicio: horaInicioFmt,
      estado: "PENDIENTE", // <- NUEVO (si el back lo requiere)
      descripcion: `Reserva de ${nombre} - ${fechaISO} ${horaInicioFmt}`, // <- NUEVO (si el back lo requiere)
    });
    toast.success("¡Reserva realizada!");
    router.push("/misTurnos");
  } catch (err: any) {
    toast.error(err?.message ?? "No se pudo reservar");
  }
}


  return (
    <Link
      href={`/clases/${id}`}
      className="group rounded-xl border border-border/60 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden block"
    >
      <div className="relative h-48 overflow-hidden">
        {/* podés cambiar a next/image si querés */}
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={nombre}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
            {nombre}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {descripcion}
          </p>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{duracion}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{participantes} inscriptos</span>
          </div>
        </div>

        <div className="mt-1">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${estilosIntensidad[intensidad]}`}
          >
            Intensidad: {intensidad}
          </span>
        </div>

        <button
          type="button"
          onClick={manejarClick}
          disabled={deshabilitado}
          className={`mt-3 w-full rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${
            deshabilitado
              ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
              : "bg-[#fee600] text-black hover:bg-black hover:text-[#fee600]"
          }`}
        >
          {textoBoton}
        </button>
      </div>
    </Link>
  );
}

export default ActivityCard;
