"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getClaseById } from "@/services/clasesService";
import { IClase } from "@/types";
import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const intensityStyles: Record<IClase["intensidad"], string> = {
  "muy alta": "bg-red-100 text-black",
  alta: "bg-orange-100 text-black",
  media: "bg-yellow-100 text-black",
  baja: "bg-green-100 text-black",
};

export default function ActivityDetailView() {
  const { id } = useParams();
  const [clase, setClase] = useState<IClase | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchClase() {
      try {
        const data = await getClaseById(id as string);
        setClase(data);
      } catch {
        setClase(null);
      }
      setLoading(false);
    }
    fetchClase();
  }, [id]);

  if (loading) return <div className="p-6">Cargando...</div>;
  if (!clase) return <div className="p-6">Clase no encontrada</div>;

  const canReserve = isAuthenticated && user?.estado === "Activo";
  const disabled = !canReserve;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={clase.imageUrl || "/placeholder.svg"} alt={clase.nombre} fill className="object-cover" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{clase.nombre}</h2>
          <p className="text-gray-700">{clase.descripcion}</p>
          <div className="flex gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{clase.duracion}</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4" />{clase.participantes} inscriptos</span>
          </div>
          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${intensityStyles[clase.intensidad]}`}>
              Intensidad: {clase.intensidad}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <p>Instructor: {clase.instructor}</p>
            <p>Horario: {clase.horario}</p>
            <p>Tipo: {clase.tipo}</p>
            <p>Grupo muscular: {clase.grupo_musculo}</p>
            <p>Músculo específico: {clase.sub_musculo}</p>
            <p>Sede: {clase.sede}</p>
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
