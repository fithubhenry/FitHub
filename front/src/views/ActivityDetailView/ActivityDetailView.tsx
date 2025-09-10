"use client";
import { IClase } from "@/types";
import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { useRole } from "@/context/RoleContext";

type Props = IClase;

const intensityStyles: Record<IClase["intensidad"], string> = {
  "muy alta": "bg-red-100 text-black",
  alta: "bg-orange-100 text-black",
  media: "bg-yellow-100 text-black",
  baja: "bg-green-100 text-black",
};

function ActivityDetailView({
  nombre,
  descripcion,
  duracion,
  participantes,
  intensidad,
  image,
  instructor,
  horario,
  tipo,
  grupo_musculo,
  sub_musculo,
  sede,
}: Props) {
  // usar el contexto para decidir si puede reservar
  const { role } = useRole();
  const canReserve = role === "premium";
  const disabled = !canReserve;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={`/${image || "placeholder.svg"}`} alt={nombre} fill className="object-cover" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{nombre}</h2>
          <p className="text-gray-700">{descripcion}</p>

          <div className="flex gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{duracion}</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4" />{participantes} inscriptos</span>
          </div>

          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${intensityStyles[intensidad]}`}>
              Intensidad: {intensidad}
            </span>
          </div>

          <div className="text-sm text-gray-600">
            <p>Instructor: {instructor}</p>
            <p>Horario: {horario}</p>
            <p>Tipo: {tipo}</p>
            <p>Grupo muscular: {grupo_musculo}</p>
            <p>Músculo específico: {sub_musculo}</p>
            <p>Sede: {sede}</p>
          </div>

          <button
            type="button"
            disabled={disabled}
            className={`mt-3 w-full rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50
              ${disabled ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                         : "bg-[#fee600] text-black hover:bg-black hover:text-[#fee600]"}`}
          >
            {disabled ? "Solo Premium" : "Reservar Clase"}
          </button>
        </div>
      </div>
    </div>
  );
}



export default ActivityDetailView;
