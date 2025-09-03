"use client"

import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

function Login(): React.ReactNode {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Aquí iría la lógica de autenticación
    console.log('Datos del login:', formData)
    
    // Simular llamada a API
    setTimeout(() => {
      setIsLoading(false)
      // Redirigir o mostrar mensaje de éxito
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <h1 className="font-anton text-4xl font-bold tracking-widest text-[#fee600] mb-2">
            FITHUB
          </h1>
          <h2 className="font-poppins text-xl text-white">
            Inicia Sesión
          </h2>
          <p className="font-poppins text-gray-400 mt-2">
            Accede a tu cuenta para continuar
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Email */}
          <div>
            <label htmlFor="email" className="block font-poppins text-sm font-medium text-[#fee600] mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-transparent font-poppins"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div>
            <label htmlFor="password" className="block font-poppins text-sm font-medium text-[#fee600] mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee600] focus:border-transparent font-poppins"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-[#fee600] transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-[#fee600] transition-colors" />
                )}
              </button>
            </div>
          </div>

          {/* Recordar contraseña */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#fee600] focus:ring-[#fee600] border-gray-600 rounded bg-gray-900"
              />
              <label htmlFor="remember-me" className="ml-2 block font-poppins text-sm text-gray-300">
                Recordarme
              </label>
            </div>
            <a href="#" className="font-poppins text-sm text-[#fee600] hover:text-yellow-400 transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-poppins text-sm font-medium text-black bg-[#fee600] hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fee600] focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                Iniciando sesión...
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </button>

          {/* Enlaces adicionales */}
          <div className="text-center">
            <p className="font-poppins text-sm text-gray-400">
              ¿No tienes una cuenta?{' '}
              <a href="/register" className="text-[#fee600] hover:text-yellow-400 transition-colors">
                Regístrate aquí
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login