"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { getUserById } from "@/services/userService";
import { useState } from "react";
import Image from "next/image";

export default function ProfileView() {
  const { user, isAuthenticated, setUser } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [fullUser, setFullUser] = useState<any>(null);

  useEffect(() => {
    if (user?.userId) {
      getUserById(user.userId)
        .then((data) => {
          console.log('[DEBUG] Avatar URL recibida:', data.profileImageUrl || data.avatarUrl);
          setFullUser(data);
        })
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
      if (user && setUser) {
        setUser({ ...user, avatarUrl: data.imageUrl || "" });
      }
    } catch {
      alert("Error al subir la imagen");
    }
    setUploading(false);
  }

  return (
   <div className="min-h-screen bg-black pt-20 px-6">
  <div className="max-w-3xl mx-auto bg-black  border-[#fee600] rounded-2xl border-2 p-6 shadow-[6px_8px_24px_0px_rgba(253,230,0,0.4)]">
    <h1 className="text-center text-2xl font-anton text-[#fee600]">MI PERFIL</h1>

    {/* Encabezado con avatar, datos y etiqueta de rol */}
    <div className="mt-6 flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-slate-700 border border-slate-600 overflow-hidden flex items-center justify-center">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="avatar"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-xs">Sin foto</span>
        )}
      </div>
      <div>
        <p className="text-white font-semibold">{user?.nombre}</p>
        <p className="text-gray-300 text-sm">{user?.correo}</p>
      </div>

      <span
        className={`ml-auto text-xs px-2 py-1 rounded-full ${
          esPremium
            ? "bg-emerald-500/20 text-emerald-300"
            : "bg-slate-700 text-gray-300 border border-slate-600"
        }`}
      >
        {etiquetaPorRol[esInvitado ? "guest" : esPremium ? "premium" : "registered"]}
      </span>
    </div>

    {/* Input para subir imagen */}
    {!esInvitado && (
      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="text-sm text-gray-300"
        />
        {uploading && <span className="ml-2 text-xs text-yellow-300">Subiendo...</span>}
      </div>
    )}

    {/* Aviso para invitados */}
    {esInvitado && (
      <div className="mt-6 p-4 rounded-md bg-yellow-50 text-black border border-[#fee600]">
        <p>
          Estás navegando como <strong>Invitado</strong>. Para editar tus
          datos, iniciá sesión.
        </p>
        <Link
          href="/login"
          className="inline-block mt-3 rounded-lg bg-[#fee600] px-4 py-2 font-semibold text-black hover:bg-yellow-400 transition-colors duration-200"
        >
          Iniciar sesión
        </Link>
      </div>
    )}

    {/* Formulario de datos */}
    <div className="mt-8 space-y-4">
      <h2 className="text-[#fee600] font-semibold">Datos:</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fee600]" placeholder="Email" defaultValue={fullUser?.email || ""} disabled={esInvitado} />
        <input className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fee600]" placeholder="Nombre" defaultValue={fullUser?.nombre || ""} disabled={esInvitado} />
        <input className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fee600]" placeholder="Apellido" defaultValue={fullUser?.apellido || ""} disabled={esInvitado} />
        <input className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fee600]" placeholder="Teléfono" defaultValue={fullUser?.telefono || ""} disabled={esInvitado} />
        <input className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fee600]" placeholder="Fecha de nacimiento" defaultValue={fullUser?.fecha_nacimiento || ""} disabled={esInvitado} />
        <input className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fee600]" placeholder="Dirección" defaultValue={fullUser?.direccion || ""} disabled={esInvitado} />
        <input className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fee600]" placeholder="Ciudad" defaultValue={fullUser?.ciudad || ""} disabled={esInvitado} />
      </div>

      <div className="flex gap-3">
        <button
          className={`mt-3 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200
            ${
              esInvitado
                ? "bg-gray-600 cursor-not-allowed text-gray-300 "
                : "bg-[#fee600] text-black hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fee600] shadow-lg hover:shadow-xl"
            }`}
          disabled={esInvitado}
        >
          Guardar cambios
        </button>

        {/* Sugerencia de upgrade para usuarios registrados */}
        {esRegistrado && (
          <Link
            href="/pago"
            className="mt-3 px-4 py-2 rounded-lg border border-[#fee600] text-[#fee600] font-semibold hover:bg-[#fee600] hover:text-black transition-colors duration-200"
          >
            Hazte premium
          </Link>
        )}
      </div>
    </div>
  </div>
</div>

  );
}
