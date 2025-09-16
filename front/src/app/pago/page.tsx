// src/app/pago/page.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
// si MpButton.tsx está en esta misma carpeta:
import MpButton from "@/components/MpButton/MpButton";
// si lo tenés en components, sería: import MpButton from "@/components/mpButton";

export default function PagoPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Hazte premium</h1>
      <p className="mb-4 text-gray-600">Accedé a reservas y beneficios.</p>

      {!user?.userId ? (
        <a
          href="/login"
          className="w-full block text-center bg-black text-yellow-400 hover:bg-yellow-500 hover:text-black font-semibold rounded px-4 py-2"
        >
          Iniciar sesión para pagar
        </a>
      ) : (
        <MpButton />
      )}
    </div>
  );
}
