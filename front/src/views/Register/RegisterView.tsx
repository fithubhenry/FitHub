"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from "lucide-react";

export default function RegisterView(): React.ReactNode {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((p) => ({ ...p, [e.target.name]: true }));
  };

  // Validaciones simples (sin Formik/Yup)
  const errors = useMemo(() => {
    const err: Partial<typeof form> & { confirmPassword?: string } = {};
    if (!form.name.trim()) err.name = "Campo requerido";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Email inválido";
    if (form.password.length < 6) err.password = "Mínimo 6 caracteres";
    if (form.confirmPassword !== form.password)
      err.confirmPassword = "Las contraseñas deben coincidir";
    if (!form.phone.trim()) err.phone = "Campo requerido";
    if (!form.address.trim()) err.address = "Campo requerido";
    return err;
  }, [form]);
  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      phone: true,
      address: true,
    });
    if (hasErrors) return;

    // 🔧 Mock de “registro” (sin backend)
    setIsLoading(true);
    try {
      console.log("[MOCK] Registrando usuario:", form);
      await new Promise((r) => setTimeout(r, 1200));
      alert("¡Usuario creado correctamente! (mock)");
      router.push("/login"); // opcional
    } finally {
      setIsLoading(false);
    }
  };

  const Error = ({ show, text }: { show?: boolean; text?: string }) =>
    show && text ? (
      <p className="mt-1 text-sm text-red-400 font-poppins">{text}</p>
    ) : null;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Encabezado igual al Login */}
        <div className="text-center mb-8">
          <h1 className="font-anton text-4xl font-bold tracking-widest text-[#fee600] mb-2">
            FITHUB
          </h1>
          <h2 className="font-poppins text-xl text-white">Crear Cuenta</h2>
          <p className="font-poppins text-gray-400 mt-2">
            Completa tus datos para empezar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block font-poppins text-sm font-medium text-[#fee600] mb-2">
              Nombre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="Tu nombre"
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-transparent font-poppins"
              />
            </div>
            <Error show={touched.name} text={errors.name} />
          </div>

          {/* Email */}
          <div>
            <label className="block font-poppins text-sm font-medium text-[#fee600] mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="tu@email.com"
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-transparent font-poppins"
              />
            </div>
            <Error show={touched.email} text={errors.email} />
          </div>

          {/* Password */}
          <div>
            <label className="block font-poppins text-sm font-medium text-[#fee600] mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="••••••••"
                className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-transparent font-poppins"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPass ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-[#fee600]" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-[#fee600]" />
                )}
              </button>
            </div>
            <Error show={touched.password} text={errors.password} />
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="block font-poppins text-sm font-medium text-[#fee600] mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="••••••••"
                className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-transparent font-poppins"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirm ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-[#fee600]" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-[#fee600]" />
                )}
              </button>
            </div>
            <Error show={touched.confirmPassword} text={errors.confirmPassword} />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block font-poppins text-sm font-medium text-[#fee600] mb-2">
              Teléfono
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="phone"
                type="text"
                value={form.phone}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="+54 9 11 1234 5678"
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-transparent font-poppins"
              />
            </div>
            <Error show={touched.phone} text={errors.phone} />
          </div>

          {/* Dirección */}
          <div>
            <label className="block font-poppins text-sm font-medium text-[#fee600] mb-2">
              Dirección
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="address"
                type="text"
                value={form.address}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="Av. Siempre Viva 742"
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-transparent font-poppins"
              />
            </div>
            <Error show={touched.address} text={errors.address} />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-poppins text-sm font-medium text-black bg-[#fee600] hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fee600] focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
                Creando cuenta...
              </div>
            ) : (
              "Crear cuenta"
            )}
          </button>

          {/* Enlace a login */}
          <div className="text-center">
            <p className="font-poppins text-sm text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" className="text-[#fee600] hover:text-yellow-400 transition-colors">
                Inicia sesión
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
