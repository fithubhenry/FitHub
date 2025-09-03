"use client"

import { useState } from "react"
import { Menu, X, Dumbbell } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* <Dumbbell className="h-8 w-8 text-[#fee600]" /> */}
            <span className="font-anton text-3xl font-bold tracking-widest text-[#fee600]">FITHUB</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className=" text-[#fee600] font-poppins hover:text-primary transition-colors duration-200">
              Inicio
            </a>
            <a href="#actividades" className="text-[#fee600] font-poppins hover:text-primary transition-colors duration-200">
              Actividades
            </a>
            <a href="#horarios" className="text-[#fee600] font-poppins hover:text-primary transition-colors duration-200">
              Horarios
            </a>
            <a href="#contacto" className="text-[#fee600] font-poppins hover:text-primary transition-colors duration-200">
              Contacto
            </a>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Únete Ahora
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-primary">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black border-t border-border">
              <a
                href="#inicio"
                className="block px-3 py-2 text-white hover:text-primary transition-colors duration-200"
                onClick={toggleMenu}
              >
                Inicio
              </a>
              <a
                href="#actividades"
                className="block px-3 py-2 text-white hover:text-primary transition-colors duration-200"
                onClick={toggleMenu}
              >
                Actividades
              </a>
              <a
                href="#horarios"
                className="block px-3 py-2 text-white hover:text-primary transition-colors duration-200"
                onClick={toggleMenu}
              >
                Horarios
              </a>
              <a
                href="#contacto"
                className="block px-3 py-2 text-white hover:text-primary transition-colors duration-200"
                onClick={toggleMenu}
              >
                Contacto
              </a>
              <div className="px-3 py-2">
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  Únete Ahora
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}