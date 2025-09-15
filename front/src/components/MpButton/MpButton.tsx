"use client";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

export default function MpButton() {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.userId) { // Solo si el usuario está autenticado, inicializa MP
      initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, {
        locale: "es-AR",
      });

      const createPreference = async () => {
        try {
          const res = await fetch("https://fithub-back-pv0m.onrender.com/mercado-pago/create-preference", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.userId }),
          });

          const data = await res.json();
          setPreferenceId(data.id);
        } catch (error) {
          console.error("Error creando preferencia:", error);
        }
      };
      createPreference();
    }
  }, [user]);

  return (
    <div>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
}