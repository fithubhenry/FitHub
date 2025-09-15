"use client";
import Link from 'next/link';

export default function FailurePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800">
      <h1 className="text-4xl font-bold mb-4">¡Pago Fallido!</h1>
      <p className="text-lg text-center mb-8">
        Hubo un problema con tu pago. Por favor, inténtalo de nuevo o contacta a soporte.
      </p>
      <Link href="/pago">
        <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
          Intentar de nuevo
        </button>
      </Link>
    </div>
  );
}