"use client";
import { IClase } from "@/types";
import { Clock, Users } from "lucide-react";
import React from "react";
import Image from "next/image";

const intensityStyles: Record<IClase["intensidad"], string> = {
  "muy alta": "bg-red-100 text-black",
  "alta": "bg-orange-100 text-black",
  "media": "bg-yellow-100 text-black",
  "baja": "bg-green-100 text-black",
};

const ActivityDetailView: React.FC<IClase> = ({
  
  nombre,
  descripcion,
  duracion,
  participantes,
  capacidad,
  intensidad,
  image,
  instructor,
  horario,
  tipo,
  grupo_musculo,
  sub_musculo,
  sede,
}) => {
  return (
    <div className="max-w-3xl w-full mt-12 mb-12 mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      {/* Imagen principal al costado */}
      <div className="md:w-1/2 w-full h-96 md:h-auto relative flex-shrink-0">
        <Image
          src={`/${image}`}
          alt={nombre}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Contenido */}
      <div className="p-8 space-y-6 flex-1">
        <div>
          <h2 className="text-2xl font-bold mb-2">{nombre}</h2>
          <p className="text-gray-700 text-base">{descripcion}</p>
        </div>

        {/* Datos principales */}
        <div className="grid grid-cols-2 gap-4 text-base text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>{duracion}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-500" />
            <span>
              {participantes}/{capacidad} inscriptos
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Instructor: {instructor}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>Horario: {horario}</span>
          </div>
        </div>

        {/* Extra info */}
        <div className="text-base text-gray-500">
          <p>Tipo: {tipo}</p>
          <p>Grupo muscular: {grupo_musculo}</p>
          <p>Músculo específico: {sub_musculo}</p>
          <p>Sede: {sede}</p>
        </div>

        {/* Intensidad */}
        <div>
          <span
            className={`inline-block px-4 py-1 rounded-full text-base font-semibold ${intensityStyles[intensidad]}`}
          >
            Intensidad: {intensidad}
          </span>
        </div>

        {/* Botón */}
        <button
          className="mt-3 w-full rounded-md bg-[#fee600] px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-black hover:text-[#fee600] focus:outline-none focus:ring-2 focus:ring-yellow-500/50">
          Reservar Clase
        </button>
      </div>
    </div>
  );
};

export default ActivityDetailView;
