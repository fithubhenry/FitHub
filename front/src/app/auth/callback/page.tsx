// app/auth/callback/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Esto evita el prerender y obliga a render en cliente
export const dynamic = "force-dynamic";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Captura el token desde la query string
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      router.replace("/dashboard"); // redirige al dashboard
    } else {
      router.replace("/login");
    }
  }, [router]);

  return <p>Procesando login con Google...</p>;
}
