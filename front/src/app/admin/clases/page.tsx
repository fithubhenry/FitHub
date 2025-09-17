'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockClases } from './mockClases';
import { IClase } from '@/types';

export default function ClasesAdminPage() {
  const [clases, setClases] = useState<IClase[]>(mockClases);
  const [form, setForm] = useState<Omit<IClase, 'id' | 'participantes' | 'image' | 'imageUrl'>>({
    nombre: '',
    descripcion: '',
    intensidad: 'media',
    instructor: '',
    horario: '',
    duracion: '',
    capacidad: 0,
    tipo: 'Yoga',
    grupo_musculo: 'Pierna',
    sub_musculo: 'abdominal',
    sede: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'capacidad' ? Number(value) : value }));
  };

  const handleAddClase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.descripcion || !form.instructor || !form.horario || !form.duracion || !form.capacidad || !form.tipo || !form.grupo_musculo || !form.sub_musculo || !form.sede) return;
    setClases([
      ...clases,
      {
        ...form,
        id: Date.now().toString(),
        participantes: 0,
        image: '',
        imageUrl: '',
      },
    ]);
    setForm({
      nombre: '', descripcion: '', intensidad: 'media', instructor: '', horario: '', duracion: '', capacidad: 0, tipo: 'Yoga', grupo_musculo: 'Pierna', sub_musculo: 'abdominal', sede: '',
    });
  };

//   const handleDeleteClase = (id: string) => {
//     setClases(clases.filter(clase => clase.id !== id));
//   };

  return (
    <div className="min-h-screen bg-black pt-2 px-2 md:px-6 flex items-start justify-center">
      <div className="w-full max-w-7xl bg-black rounded-2xl p-2 sm:p-4 md:p-8 shadow-[6px_8px_24px_0px_rgba(253,230,0,0.2)] flex flex-col gap-6 items-center">
  <h1 className="text-center text-2xl font-anton text-[#fee600]">Administración de Clases</h1>
  <Link href="/admin/clases/todas" className="mt-2 mb-4 inline-block bg-[#fee600] text-black font-semibold px-4 py-2 rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors">Ver todas las clases</Link>
  <form onSubmit={handleAddClase} className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600] col-span-1" />
    <input type="text" name="instructor" placeholder="Instructor" value={form.instructor} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600] col-span-1" />
    {/* Sede, Capacidad, Horario, Duración en una fila */}
    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
      <input type="text" name="sede" placeholder="Sede" value={form.sede} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600]" />
      <input type="number" name="capacidad" placeholder="Capacidad" value={form.capacidad || ''} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600]" />
      <input type="text" name="horario" placeholder="Horario" value={form.horario} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600]" />
      <input type="text" name="duracion" placeholder="Duración" value={form.duracion} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600]" />
    </div>
    {/* Selects en una fila */}
    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
      <select name="intensidad" value={form.intensidad} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full">
        <option value="muy alta">Muy alta</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
      <select name="tipo" value={form.tipo} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full">
        <option value="Yoga">Yoga</option>
        <option value="Crossfit">Crossfit</option>
        <option value="Spinning">Spinning</option>
        <option value="Pilates">Pilates</option>
        <option value="Zumba">Zumba</option>
        <option value="Boxeo">Boxeo</option>
        <option value="Funcional">Funcional</option>
      </select>
      <select name="grupo_musculo" value={form.grupo_musculo} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full">
        <option value="Pierna">Pierna</option>
        <option value="Brazos">Brazos</option>
        <option value="Abdomen">Abdomen</option>
        <option value="Espalda">Espalda</option>
        <option value="Glúteos">Glúteos</option>
        <option value="Cardio">Cardio</option>
      </select>
      <select name="sub_musculo" value={form.sub_musculo} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full">
        <option value="biceps">Bíceps</option>
        <option value="triceps">Tríceps</option>
        <option value="cuadriceps">Cuádriceps</option>
        <option value="abdominal">Abdominal</option>
        <option value="gluteo">Glúteo</option>
        <option value="dorsal">Dorsal</option>
        <option value="pectoral">Pectoral</option>
      </select>
    </div>
    <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} rows={3} className="border border-[#fee600] bg-black text-white px-2 py-2 rounded w-full focus:ring-2 focus:ring-[#fee600] col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 resize-none min-h-[60px]" />
    <div className="w-full flex justify-end mt-2 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
      <button type="submit" className="bg-[#fee600] text-black font-bold px-8 py-2 text-base rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors">Agregar</button>
    </div>
  </form>
      </div>
    </div>
  );
}
