// Página para mostrar todas las clases en formato cards (como ClasesFilterView), pero con botón de eliminar
'use client';

import { useState } from 'react';
import { mockClases } from '../mockClases';
import { IClase } from '@/types';

export default function TodasClasesAdminPage() {
  const [clases, setClases] = useState<IClase[]>(mockClases);

  const handleDeleteClase = (id: string) => {
    setClases(clases.filter(clase => clase.id !== id));
  };

  return (
    <div className="min-h-screen bg-black pt-4 px-2 md:px-6 flex flex-col items-center">
      <h1 className="text-center text-2xl font-anton text-[#fee600] mb-6">Todas las Clases</h1>
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {clases.map(clase => (
          <div key={clase.id} className="bg-gray-900 rounded-xl border border-[#fee600] shadow p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#fee600] mb-2">{clase.nombre}</h2>
              <p className="text-white text-sm mb-2 line-clamp-2">{clase.descripcion}</p>
              <div className="text-xs text-gray-300 mb-1">Instructor: {clase.instructor}</div>
              <div className="text-xs text-gray-300 mb-1">Horario: {clase.horario} | Duración: {clase.duracion}</div>
              <div className="text-xs text-gray-300 mb-1">Capacidad: {clase.capacidad}</div>
              <div className="text-xs text-gray-300 mb-1">Tipo: {clase.tipo}</div>
              <div className="text-xs text-gray-300 mb-1">Grupo: {clase.grupo_musculo} | Sub: {clase.sub_musculo}</div>
              <div className="text-xs text-gray-300 mb-1">Sede: {clase.sede}</div>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#fee600] text-black">{clase.intensidad}</span>
            </div>
            <button
              className="mt-4 bg-[#fee600] text-black font-semibold px-4 py-2 rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors"
              onClick={() => handleDeleteClase(clase.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
