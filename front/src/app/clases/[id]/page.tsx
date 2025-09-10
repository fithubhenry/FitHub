"use client";
import { useParams } from "next/navigation";
import { preloadClases } from "@/helpers/preloadClases";
import ActivityDetailView from "@/views/ActivityDetailView/ActivityDetailView";


export default function ClaseDetallePage() {
  const { id } = useParams<{ id: string }>();
  

  const clase = preloadClases.find((c) => String(c.id) === String(id));
  if (!clase) return <p className="p-6">Clase no encontrada</p>;

  return <ActivityDetailView {...clase} />;
}
