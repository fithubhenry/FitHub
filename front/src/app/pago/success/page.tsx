"use client";
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-green-800">
      <h1 className="text-4xl font-bold mb-4">¡Pago Exitoso!</h1>
      <p className="text-lg text-center mb-8">
        Tu membresía ha sido activada. ¡Bienvenido a FitHub Premium!
      </p>
      <Link href="/">
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
}