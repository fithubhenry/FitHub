"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { getUserById } from "@/services/userService";
import { useState } from "react";
import Image from "next/image";

export default function ProfileView() {
// importación ya está arriba
  const { user, isAuthenticated } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [fullUser, setFullUser] = useState<any>(null);

  useEffect(() => {
    if (user?.userId) {
      getUserById(user.userId)
        .then(setFullUser)
        .catch(() => setFullUser(null));
    }
  }, [user?.userId]);


  // Etiqueta legible según el rol
  const etiquetaPorRol: Record<"guest" | "registered" | "premium", string> = {
    guest: "Invitado",
    registered: "Registrado",
    premium: "Premium",
  };

  const esInvitado = !isAuthenticated;
  const esRegistrado = isAuthenticated && user?.estado === "Invitado";
  const esPremium = isAuthenticated && user?.estado === "Activo";

  // Subida al backend
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user?.userId) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const token = localStorage.getItem("token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile-image/${user.userId}`, {
        method: "PATCH",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) throw new Error("Error al subir la imagen");
      const data = await res.json();
      console.log("URL recibida del backend:", data.imageUrl);
      setAvatarUrl(data.imageUrl || "");
    } catch {
      alert("Error al subir la imagen");
    }
    setUploading(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white">Mi perfil</h1>

      {/* Encabezado con avatar, datos y etiqueta de rol */}
      <div className="mt-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-neutral-800 overflow-hidden flex items-center justify-center">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="avatar"
              width={64}
              height={64}
              className="rounded-full object-cover"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          ) : (
            <span className="text-neutral-400 text-xs">Sin foto</span>
          )}
        </div>
        <div>
          <p className="text-white font-semibold">{user?.nombre}</p>
          <p className="text-neutral-400 text-sm">{user?.correo}</p>
        </div>

        <span
          className={`ml-auto text-xs px-2 py-1 rounded-full ${
            esPremium
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-neutral-800 text-neutral-300"
          }`}
        >
          {etiquetaPorRol[esInvitado ? "guest" : esPremium ? "premium" : "registered"]}
        </span>
      </div>

      {/* Input para subir imagen */}
      {!esInvitado && (
        <div className="mt-2">
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
          {uploading && <span className="ml-2 text-xs text-yellow-300">Subiendo...</span>}
        </div>
      )}

      {/* Aviso para invitados */}
      {esInvitado && (
        <div className="mt-4 p-3 rounded-md bg-yellow-50 text-black">
          <p>
            Estás navegando como <strong>Invitado</strong>. Para editar tus
            datos, iniciá sesión.
          </p>
          <Link
            href="/login"
            className="inline-block mt-2 rounded bg-[#fee600] px-4 py-2 font-semibold text-black"
          >
            Iniciar sesión
          </Link>
        </div>
      )}

      {/* Formulario de datos */}
      <div className="mt-6 space-y-2">
        <h2 className="text-white font-semibold">Datos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="bg-neutral-900 text-white rounded p-2" placeholder="Email" defaultValue={fullUser?.email || ""} disabled={esInvitado} />
          <input className="bg-neutral-900 text-white rounded p-2" placeholder="Nombre" defaultValue={fullUser?.nombre || ""} disabled={esInvitado} />
          <input className="bg-neutral-900 text-white rounded p-2" placeholder="Apellido" defaultValue={fullUser?.apellido || ""} disabled={esInvitado} />
          <input className="bg-neutral-900 text-white rounded p-2" placeholder="Teléfono" defaultValue={fullUser?.telefono || ""} disabled={esInvitado} />
          <input className="bg-neutral-900 text-white rounded p-2" placeholder="Fecha de nacimiento" defaultValue={fullUser?.fecha_nacimiento || ""} disabled={esInvitado} />
          <input className="bg-neutral-900 text-white rounded p-2" placeholder="Dirección" defaultValue={fullUser?.direccion || ""} disabled={esInvitado} />
          <input className="bg-neutral-900 text-white rounded p-2" placeholder="Ciudad" defaultValue={fullUser?.ciudad || ""} disabled={esInvitado} />
        </div>

        <div className="flex gap-3">
          <button
            className={`mt-3 px-4 py-2 rounded font-semibold ${
              esInvitado
                ? "bg-neutral-300 text-neutral-600 cursor-not-allowed"
                : "bg-[#fee600] text-black"
            }`}
            disabled={esInvitado}
          >
            Guardar cambios
          </button>

          {/* Sugerencia de upgrade para usuarios registrados */}
          {esRegistrado && (
            <Link
              href="/pago"
              className="mt-3 px-4 py-2 rounded border border-[#fee600] text-[#fee600] font-semibold hover:bg-[#fee600] hover:text-black"
            >
              Hazte premium
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
