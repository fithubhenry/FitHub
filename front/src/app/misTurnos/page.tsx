"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";


export default function MisTurnosPage() {
  const { user } = useAuth();
  const role = user?.estado;

  if (role !== "Activo") {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2">Solo para usuarios Premium</h1>
        <Link href="/pago" className="text-blue-600 underline">Hazte premium</Link>
      </div>
    );
  }

  // maqueta simple
  const turnos = [
    { id: 1, clase: "Funcional Avanzado", fecha: "04/10/2025 10:00", estado: "Reservado" },
    { id: 2, clase: "HIIT Explosivo",     fecha: "06/10/2025 18:00", estado: "Reservado" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mis turnos</h1>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr><th className="p-2 text-left">Clase</th><th className="p-2 text-left">Fecha</th><th className="p-2 text-left">Estado</th></tr>
        </thead>
        <tbody>
          {turnos.map(t => (
            <tr key={t.id} className="border-t">
              <td className="p-2">{t.clase}</td>
              <td className="p-2">{t.fecha}</td>
              <td className="p-2">{t.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
