"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getClaseById } from "@/services/clasesService";
import ActivityDetailView from "@/views/ActivityDetailView/ActivityDetailView";
import { IClase } from "@/types";
import Loader from "@/components/Loader/Loader"; // Ensure Loader is imported to avoid reference error

export default function ClaseDetallePage() {
  const { id } = useParams<{ id: string }>();
  const [clase, setClase] = useState<IClase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getClaseById(id);
        setClase(data);
      } catch {
        setClase(null);
      }
      setLoading(false);
    })();
  }, [id]);

    if (loading) return <Loader text="Cargando clase..." />;
  if (!clase) return <p className="p-6">Clase no encontrada</p>;

  return <ActivityDetailView clase={clase} />
};
