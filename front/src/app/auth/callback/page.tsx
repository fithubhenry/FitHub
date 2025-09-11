"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const token = searchParams.get("token");

    if (token) {
      // Guardar JWT en localStorage
      localStorage.setItem("token", token);

      // Redirigir al dashboard o página principal
      router.replace("/");
    } else {
      // Si no hay token, redirigir a login
      router.replace("/login");
    }
  }, [searchParams, router]);

  return <p>Procesando login con Google...</p>;
}
