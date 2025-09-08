'use client'

import { ValidateLoginUser } from "@/helpers/validators";
import { ILoginUser } from "@/types";
import { Formik, Form } from "formik";
import { useState } from "react";

const LoginView = () => {
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
            Inicia Sesión
          </h2>
          <p className="text-white text-lg">
            Accede a tu cuenta para continuar
          </p>
        </div>
        
        <Formik<ILoginUser>
          initialValues={{
            email: '',
            password: ''
          }}
          validate={ValidateLoginUser}
          onSubmit={(values, { setSubmitting }) => {
            console.log('Valores del formulario:', values);
            console.log('Formulario válido - listo para enviar al backend cuando esté disponible');
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, touched, errors, values, handleChange, handleBlur }) => (
            <Form className="space-y-6">
              
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

              {/* Campo Contraseña */}
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
                    placeholder="Tu contraseña"
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

              {/* Opciones adicionales */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-[#fee600] bg-slate-800 border-slate-600 rounded focus:ring-[#fee600] focus:ring-2"
                  />
                  <span className="ml-2 text-white text-sm">Recordarme</span>
                </label>
                <a href="#" className="text-[#fee600] hover:text-yellow-400 text-sm font-medium transition-colors duration-200">
                  ¿Olvidaste tu contraseña?
                </a>
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
                  {isSubmitting ? 'Validando...' : 'Iniciar Sesión'}
                </button>
              </div>

              {/* Enlace a registro */}
              <div className="text-center">
                <p className="text-white text-sm">
                  ¿No tienes una cuenta?{' '}
                  <a href="/register" className="text-[#fee600] hover:text-yellow-400 font-medium transition-colors duration-200">
                    Regístrate aquí
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

export default LoginView;