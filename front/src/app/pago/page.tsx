"use client";
import { useAuth } from "@/context/AuthContext";
import MpButton from "@/components/MpButton/MpButton";

export default function PagoPage() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Hazte premium</h1>
      <p className="mb-4 text-gray-600">Accedé a reservas y beneficios.</p>
      
      {isAuthenticated ? (
        <MpButton />
      ) : (
        <p className="text-red-500 font-semibold text-center">
          Necesitas iniciar sesión para pagar.
        </p>
      )}
    </div>
  );
}