"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <span className="font-anton text-3xl font-bold tracking-widest text-[#fee600]">
                FITHUB
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <p className="text-[#fee600] font-poppins hover:text-primary transition-colors duration-200">
                Inicio
              </p>
            </Link>
            <Link href="/clases">
              <p className="text-[#fee600] font-poppins hover:text-primary transition-colors duration-200">
                Clases
              </p>
            </Link>

            <Link href="/login">
              <button className="px-4 py-2 rounded-md bg-[#fee600] text-black font-semibold hover:bg-yellow-400 transition">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 rounded-md border border-[#fee600] text-[#fee600] font-semibold hover:bg-[#fee600] hover:text-black transition">
                Register
              </button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#fee600] hover:text-primary"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black border-t border-border">
              <Link href="/" onClick={toggleMenu}>
                <p className="block px-3 py-2 text-[#fee600] hover:text-primary transition">
                  Inicio
                </p>
              </Link>
              <Link href="/clases" onClick={toggleMenu}>
                <p className="block px-3 py-2 text-[#fee600] hover:text-primary transition">
                  Actividades
                </p>
              </Link>

              <Link href="/login" onClick={toggleMenu}>
                <button className="w-full mt-2 px-4 py-2 rounded-md bg-[#fee600] text-black font-semibold hover:bg-yellow-400">
                  Login
                </button>
              </Link>
              <Link href="/register" onClick={toggleMenu}>
                <button className="w-full mt-2 px-4 py-2 rounded-md border border-[#fee600] text-[#fee600] font-semibold hover:bg-[#fee600] hover:text-black">
                  Register
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
