"use client";

import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import { getClases } from "@/services/clasesService";
import ActivityCard from "@/components/Cards/ActivityCard";
import Loader from "@/components/Loader/Loader";
import { IClase } from "@/types";
import Link from "next/link";

export default function Home() {
  const [clases, setClases] = useState<IClase[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const data = await getClases();
        setClases(data);
      } catch {
        setClases([]);
      }
      setLoading(false);
    })();
  }, []);

  const [showStartButton, setShowStartButton] = useState(false);

  useEffect(() => {
    setShowStartButton(!Cookie.get("token"));
  }, []);

  if (user?.esAdmin) {
    return (
      <main>
        <section className="flex flex-col items-center justify-center py-12 px-4 bg-[#fee600] min-h-[80vh]">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-center">
        ¡Bienvenido al panel de Administrador!
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-xl">
        Este panel te permite gestionar usuarios, clases y revisar estadísticas de la plataforma.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
        <a href="/admin/usuarios" className="block p-6 bg-black text-[#fee600] rounded-lg shadow hover:bg-[#fee600] hover:text-black transition">Gestionar usuarios</a>
        <a href="/admin/clases" className="block p-6 bg-black text-[#fee600] rounded-lg shadow hover:bg-[#fee600] hover:text-black transition">Gestionar clases</a>
        <a href="/admin/pagos" className="block p-6 bg-black text-[#fee600] rounded-lg shadow hover:bg-[#fee600] hover:text-black transition">Ver pagos</a>
        <a href="/admin/estadisticas" className="block p-6 bg-black text-[#fee600] rounded-lg shadow hover:bg-[#fee600] hover:text-black transition">Estadísticas</a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 bg-[#fee600]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-center">
          ¡Bienvenido a FitHub!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-xl">
          Tu plataforma para alcanzar tus objetivos fitness. Descubre planes, rutinas y mucho más.
        </p>
        {showStartButton && (
          <Link href="/login">
          <button
            className="px-8 py-4 bg-gray-900 cursor-pointer text-white rounded-lg text-lg font-semibold"
          >
            Empezar ahora
          </button>
          </Link>
        )}
      </section>

      <section>
        <div className="text-center mt-16 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Nuestras <span className="text-[#fee600]">Actividades</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre una amplia variedad de clases diseñadas para todos los niveles. Desde entrenamientos de alta
            intensidad hasta sesiones de relajación y bienestar.
          </p>
        </div>

        {loading ? (
          <Loader text="Cargando actividades..." />
        ) : (
          <div className="grid mb-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {clases.map((clase) => (
              <ActivityCard
                key={clase.id}
                {...clase}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
