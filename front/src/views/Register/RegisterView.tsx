'use client'

import { ValidateRegisterUser } from "@/helpers/validators";
import { IRegisterUser } from "@/types";
import { Formik, Form } from "formik";
import { useState } from "react";

const RegisterView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            name: '',
            email: '',
            password: '',
            address: '',
            phone: ''
          }}
          validate={ValidateRegisterUser}
          onSubmit={(values, { setSubmitting }) => {
            console.log('Valores del formulario:', values);
            console.log('Formulario válido - listo para enviar al backend cuando esté disponible');
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, touched, errors, values, handleChange, handleBlur }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#fee600] font-medium text-sm mb-2">
                  Nombre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    name="name" 
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`
                      w-full pl-10 pr-3 py-3 bg-slate-800 border border-slate-600 rounded-lg
                      text-white placeholder-gray-300
                      focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-[#fee600]
                      transition-colors duration-200
                      ${touched.name && errors.name ? 'border-red-500' : ''}
                    `}
                    placeholder="Tu nombre"
                  />
                </div>
                {touched.name && errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Campo Email */}
              <div>
                <label htmlFor="email" className="block text-[#fee600] font-medium text-sm mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`
                      w-full pl-10 pr-3 py-3 bg-slate-800 border border-slate-600 rounded-lg
                      text-white placeholder-gray-300
                      focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-[#fee600]
                      transition-colors duration-200
                      ${touched.email && errors.email ? 'border-red-500' : ''}
                    `}
                    placeholder="tu@email.com"
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-[#fee600] font-medium text-sm mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password" 
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`
                      w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-600 rounded-lg
                      text-white placeholder-gray-300
                      focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-[#fee600]
                      transition-colors duration-200
                      ${touched.password && errors.password ? 'border-red-500' : ''}
                    `}
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-slate-700 rounded-r-lg transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      )}
                    </svg>
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
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input 
                    type="tel" 
                    name="phone" 
                    id="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`
                      w-full pl-10 pr-3 py-3 bg-slate-800 border border-slate-600 rounded-lg
                      text-white placeholder-gray-300
                      focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-[#fee600]
                      transition-colors duration-200
                      ${touched.phone && errors.phone ? 'border-red-500' : ''}
                    `}
                    placeholder="+54 9 11 1234 5678"
                  />
                </div>
                {touched.phone && errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Campo Dirección */}
              <div>
                <label htmlFor="address" className="block text-[#fee600] font-medium text-sm mb-2">
                  Dirección
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    name="address" 
                    id="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`
                      w-full pl-10 pr-3 py-3 bg-slate-800 border border-slate-600 rounded-lg
                      text-white placeholder-gray-300
                      focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-[#fee600]
                      transition-colors duration-200
                      ${touched.address && errors.address ? 'border-red-500' : ''}
                    `}
                    placeholder="Av. Siempre Viva 742"
                  />
                </div>
                {touched.address && errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              {/* Botón de envío */}
              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`
                    w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200
                    ${isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed text-gray-300' 
                      : 'bg-[#fee600] text-black hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fee600] shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  {isSubmitting ? 'Validando...' : 'Registrarse'}
                </button>
              </div>

              {/* Enlace a login */}
              <div className="text-center">
                <p className="text-white text-sm">
                  ¿Ya tienes una cuenta?{' '}
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