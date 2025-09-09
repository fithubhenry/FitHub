'use client'

import { ValidateRegisterUser } from "@/helpers/validators";
import { IRegisterUser } from "@/types";
import { Formik, Form } from "formik";
import { useState } from "react";

const RegisterView = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#fee600] mb-2 font-sans">
            FITHUB
          </h1>
        </div>

        {/* Título del formulario */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#fee600] mb-2 font-sans">
            Crear Cuenta
          </h2>
          <p className="text-white text-lg">
            Completa tus datos para empezar
          </p>
        </div>
        
        <Formik<IRegisterUser>
          initialValues={{
            name: "",
            lastname: "",
            birthdate: "",
            email: "",
            password: "",
            address: "",
            phone: ""
          }}
          validate={ValidateRegisterUser}
          onSubmit={(values, { setSubmitting }) => {
            const payload = { ...values, birthdate: new Date(values.birthdate) };
            console.log("Valores:", payload);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, touched, errors, values, handleChange, handleBlur }) => (
            <Form className="space-y-6">
              
              {/* Campo Nombre */}
              <div>
                <label htmlFor="name" className="block text-[#fee600] font-medium text-sm mb-2">
                  Nombre
                </label>
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full py-3 px-3 bg-slate-800 border rounded-lg text-white
                    ${touched.name && errors.name ? "border-red-500" : "border-slate-600"}`}
                  placeholder="Tu nombre"
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Campo Apellido */}
              <div>
                <label htmlFor="lastname" className="block text-[#fee600] font-medium text-sm mb-2">
                  Apellido
                </label>
                <input 
                  type="text" 
                  name="lastname" 
                  id="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full py-3 px-3 bg-slate-800 border rounded-lg text-white
                    ${touched.lastname && errors.lastname ? "border-red-500" : "border-slate-600"}`}
                  placeholder="Tu apellido"
                />
                {touched.lastname && errors.lastname && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
                )}
              </div>

              {/* Campo Fecha de Nacimiento */}
              <div>
                <label htmlFor="birthdate" className="block text-[#fee600] font-medium text-sm mb-2">
                  Fecha de nacimiento
                </label>
                <input 
                  type="date" 
                  name="birthdate" 
                  id="birthdate"
                  value={values.birthdate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full py-3 px-3 bg-slate-800 border rounded-lg text-white
                    ${touched.birthdate && errors.birthdate ? "border-red-500" : "border-slate-600"}`}
                />
                {touched.birthdate && errors.birthdate && (
                  <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>
                )}
              </div>

              {/* Campo Email */}
              <div>
                <label htmlFor="email" className="block text-[#fee600] font-medium text-sm mb-2">
                  Correo Electrónico
                </label>
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full py-3 px-3 bg-slate-800 border rounded-lg text-white
                    ${touched.email && errors.email ? "border-red-500" : "border-slate-600"}`}
                  placeholder="tu@email.com"
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Campo Contraseña */}
              <div>
                <label htmlFor="password" className="block text-[#fee600] font-medium text-sm mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password" 
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full py-3 px-3 bg-slate-800 border rounded-lg text-white
                      ${touched.password && errors.password ? "border-red-500" : "border-slate-600"}`}
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 text-sm text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Campo Teléfono */}
              <div>
                <label htmlFor="phone" className="block text-[#fee600] font-medium text-sm mb-2">
                  Teléfono
                </label>
                <input 
                  type="tel" 
                  name="phone" 
                  id="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full py-3 px-3 bg-slate-800 border rounded-lg text-white
                    ${touched.phone && errors.phone ? "border-red-500" : "border-slate-600"}`}
                  placeholder="+54 9 11 1234 5678"
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Campo Dirección */}
              <div>
                <label htmlFor="address" className="block text-[#fee600] font-medium text-sm mb-2">
                  Dirección
                </label>
                <input 
                  type="text" 
                  name="address" 
                  id="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full py-3 px-3 bg-slate-800 border rounded-lg text-white
                    ${touched.address && errors.address ? "border-red-500" : "border-slate-600"}`}
                  placeholder="Av. Siempre Viva 742"
                />
                {touched.address && errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              {/* Botón de envío */}
              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200
                    ${isSubmitting 
                      ? "bg-gray-600 cursor-not-allowed text-gray-300" 
                      : "bg-[#fee600] text-black hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fee600] shadow-lg hover:shadow-xl"
                    }`}
                >
                  {isSubmitting ? "Validando..." : "Registrarse"}
                </button>
              </div>

              {/* Enlace a login */}
              <div className="text-center">
                <p className="text-white text-sm">
                  ¿Ya tienes una cuenta?{" "}
                  <a href="/login" className="text-[#fee600] hover:text-yellow-400 font-medium transition-colors duration-200">
                    Inicia sesión aquí
                  </a>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterView;
