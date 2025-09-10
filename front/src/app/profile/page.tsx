"use client";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";
import ProfileView from "@/views/ProfileView/ProfileView";

export default function Page() {
  const { role } = useRole();

  if (role === "guest") {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2">Necesitas iniciar sesión</h1>
        <Link href="/login" className="text-blue-600 underline">Ir a Login</Link>
      </div>
    );
  }

  return <ProfileView />;
}
