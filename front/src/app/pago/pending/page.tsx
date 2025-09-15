"use client";
import Link from 'next/link';

export default function PendingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 text-yellow-800">
      <h1 className="text-4xl font-bold mb-4">Pago Pendiente</h1>
      <p className="text-lg text-center mb-8">
        Estamos esperando la confirmación de tu pago. Te notificaremos cuando se apruebe.
      </p>
      <Link href="/">
        <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
}