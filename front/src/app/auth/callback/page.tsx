"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Loader from "@/components/Loader/Loader";

export const dynamic = "force-dynamic";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      router.replace("/profile");
      Cookies.set("token", token, { expires: 7 });
    }
  }, [router]);

  return <Loader text="Procesando login con Google..." />;
}
