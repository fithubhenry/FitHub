"use client";
import { useRouter } from "next/navigation";
import { Dumbbell, ArrowLeftCircle } from "lucide-react";

export default function NotFoundGym() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {/* Logo estilo FITHUB */}
      <div className="absolute top-6 left-6">
        <h1 className="text-2xl font-bold text-yellow-400">FITHUB</h1>
      </div>

      {/* Ícono central */}
      <div className="mb-8">
        <Dumbbell className="w-20 h-20 text-yellow-400 animate-bounce" />
      </div>

      {/* Texto principal */}
      <h1 className="text-6xl font-extrabold text-yellow-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
      <p className="text-gray-400 max-w-md text-center mb-8">
        Parece que te perdiste el entrenamiento...  
        ¡pero no te preocupes, vuelve al inicio y sigue levantando el progreso! 💪
      </p>

      {/* Botón regresar */}
      <button
        onClick={handleGoHome}
        className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        <ArrowLeftCircle className="w-5 h-5" />
        Volver al inicio
      </button>
    </div>
  );
}