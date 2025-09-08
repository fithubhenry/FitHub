"use client";

import { useParams, useRouter } from "next/navigation";
import { preloadClases } from "@/helpers/preloadClases";
import ActivityDetailView from "@/components/ActivityDetailView/ActivityDetailView";


export default function ClaseDetallePage() {
  const { id } = useParams();
  const router = useRouter();

  const clase = preloadClases.find((c) => c.id === id);

  if (!clase) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold">Clase no encontrada</h2>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return <ActivityDetailView {...clase} />;
}
