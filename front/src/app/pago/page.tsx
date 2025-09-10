"use client";
import { useRole } from "@/context/RoleContext";
import { useRouter } from "next/navigation";

export default function PagoPage() {
  const { setRole } = useRole();
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Hazte premium</h1>
      <p className="mb-4 text-gray-600">Accedé a reservas y beneficios.</p>
      <button
        onClick={() => { setRole("premium"); router.push("/clases"); }}
        className="w-full bg-yellow-400 hover:bg-black hover:text-yellow-400 text-black font-semibold rounded px-4 py-2"
      >
        Pagar ahora (demo)
      </button>
    </div>
  );
}
