"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function ProfileView() {
  const { user, isAuthenticated } = useAuth();

  // Etiqueta legible según el rol
  const etiquetaPorRol: Record<"guest" | "registered" | "premium", string> = {
    guest: "Invitado",
    registered: "Registrado",
    premium: "Premium",
  };

  const esInvitado = !isAuthenticated;
  const esRegistrado = isAuthenticated && user?.estado === "Invitado";
  const esPremium = isAuthenticated && user?.estado === "Activo";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white">Mi perfil</h1>

      {/* Encabezado con avatar, datos y etiqueta de rol */}
      <div className="mt-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-neutral-800" />
        <div>
          <p className="text-white font-semibold">Genaro Usuario</p>
          <p className="text-neutral-400 text-sm">genaro@correo.com</p>
        </div>

        <span
          className={`ml-auto text-xs px-2 py-1 rounded-full ${
            esPremium
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-neutral-800 text-neutral-300"
          }`}
        >
          {etiquetaPorRol[esInvitado ? "guest" : esPremium ? "premium" : "registered"]}
        </span>
      </div>

      {/* Aviso para invitados */}
      {esInvitado && (
        <div className="mt-4 p-3 rounded-md bg-yellow-50 text-black">
          <p>
            Estás navegando como <strong>Invitado</strong>. Para editar tus
            datos, iniciá sesión.
          </p>
          <Link
            href="/login"
            className="inline-block mt-2 rounded bg-[#fee600] px-4 py-2 font-semibold text-black"
          >
            Iniciar sesión
          </Link>
        </div>
      )}

      {/* Formulario de datos */}
      <div className="mt-6 space-y-2">
        <h2 className="text-white font-semibold">Datos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="bg-neutral-900 text-white rounded p-2"
            placeholder="Nombre"
            defaultValue="Ale Usuario"
            disabled={esInvitado}
          />
          <input
            className="bg-neutral-900 text-white rounded p-2"
            placeholder="Email"
            defaultValue="ale@correo.com"
            disabled={esInvitado}
          />
        </div>

        <div className="flex gap-3">
          <button
            className={`mt-3 px-4 py-2 rounded font-semibold ${
              esInvitado
                ? "bg-neutral-300 text-neutral-600 cursor-not-allowed"
                : "bg-[#fee600] text-black"
            }`}
            disabled={esInvitado}
          >
            Guardar cambios
          </button>

          {/* Sugerencia de upgrade para usuarios registrados */}
          {esRegistrado && (
            <Link
              href="/pago"
              className="mt-3 px-4 py-2 rounded border border-[#fee600] text-[#fee600] font-semibold hover:bg-[#fee600] hover:text-black"
            >
              Hazte premium
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
