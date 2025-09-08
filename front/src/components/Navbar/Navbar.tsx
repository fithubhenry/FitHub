"use client"

import { useState } from "react"
import { Menu, X, Dumbbell } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)


  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              <span className="font-anton text-3xl font-bold tracking-widest text-[#fee600]">FITHUB</span>
            </Link>
          </div>


          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <p className=" text-[#fee600] font-poppins hover:text-primary transition-colors duration-200">
                Inicio
              </p>
            </Link>
            <Link href="/clases">
              <p className="text-[#fee600] font-poppins hover:text-primary transition-colors duration-200">
                Clases
              </p>
            </Link>

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-[#fee600] hover:text-primary">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black border-t border-border">
              <Link href="/">
                <p

                  className="block px-3 py-2 text-[#fee600] hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Inicio
                </p>
              </Link>
              <Link href="/clases">
                <p

                  className="block px-3 py-2 text-[#fee600] hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Actividades
                </p>
              </Link>
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