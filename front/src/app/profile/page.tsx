"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProfileView from "@/views/ProfileView/ProfileView";

export default function Page() {

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2">Necesitas iniciar sesión</h1>
        <Link href="/login" className="text-blue-600 underline">Ir a Login</Link>
      </div>
    );
  }

  return <ProfileView />;
}
