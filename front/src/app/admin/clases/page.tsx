'use client';

import { useState, useEffect } from 'react';
import apiClases from '@/services/apiClases';
import Link from 'next/link';
import { IClase } from '@/types';

export default function ClasesAdminPage() {
  const [clases, setClases] = useState<IClase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchClases = async () => {
      try {
        setLoading(true);
        const data = await apiClases.get('/clases');
  setClases(Array.isArray(data) ? data.filter((clase: any) => clase.estado !== false) : []);
        setError(null);
      } catch {
        setError('Error al cargar clases');
      } finally {
        setLoading(false);
      }
    };
    fetchClases();
  }, []);
  const [form, setForm] = useState({
    nombre: 'Voley',
    descripcion: 'asncioas',
    intensidad: 'Media',
    instructor: 'Juli',
    horarios: [{
      fecha: '',
      horaInicio: '',
      horaFin: '',
    }],
    duracion: '',
    capacidad: 0,
    tipo: 'Yoga',
    grupo_musculo: 'Pierna',
    sub_musculo: 'Abdominal',
    sede: 'Central',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('horarios.')) {
      const field = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        horarios: [{ ...prev.horarios[0], [field]: value }]
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: name === 'capacidad' ? Number(value) : value }));
    }
  };

  const handleAddClase = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Intentando agregar clase, form:', form);
    if (!form.nombre || !form.descripcion || !form.instructor || !form.duracion || !form.capacidad || !form.tipo || !form.grupo_musculo || !form.sub_musculo || !form.sede
  || !form.horarios[0].fecha || !form.horarios[0].horaInicio || !form.horarios[0].horaFin) {
      console.warn('Faltan campos obligatorios');
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    try {
      const payload = {
        ...form,
        grupo_musculo: [form.grupo_musculo],
        sub_musculo: [form.sub_musculo],
      };
      // Formatear horaInicio y horaFin a HH:mm:ss
      const formatHora = (h: string) => h && h.length === 5 ? h + ':00' : h;
      const horarios = [{
        fecha: form.horarios[0].fecha,
        horaInicio: formatHora(form.horarios[0].horaInicio),
        horaFin: formatHora(form.horarios[0].horaFin),
      }];
      payload.horarios = horarios;
      if (!form.imageUrl) payload.imageUrl = 'https://example.com/image.jpg';
      console.log('Payload a enviar:', payload);
      const nuevaClase = await apiClases.post('/clases', payload);
      console.log('Respuesta del backend:', nuevaClase);
      setClases([...clases, nuevaClase]);
      setForm({
        nombre: '', descripcion: '', intensidad: 'Media', instructor: '', horarios: [{ fecha: '', horaInicio: '', horaFin: '' }], duracion: '', capacidad: 0, tipo: 'Yoga', grupo_musculo: 'Pierna', sub_musculo: 'Abdominal', sede: '', imageUrl: '',
      });
      alert('Clase agregada correctamente');
    } catch (err) {
      alert('Error al agregar la clase');
      console.error('Error al agregar clase:', err);
    }
  };

  const handleDeleteClase = async (id: string) => {
    try {
      console.log('Intentando eliminar clase con id:', id);
      await apiClases.delete(`/clases/${id}`);
      // Recargar lista desde backend para evitar ids inexistentes
      const data = await apiClases.get('/clases');
      setClases(data);
      alert('Clase eliminada correctamente');
    } catch (err) {
      alert('Error al eliminar la clase');
      console.error('Error al eliminar clase:', err);
    }
  };



  return (
    <div className="min-h-screen bg-black pt-2 px-2 md:px-6 flex items-start justify-center">
      <div className="w-full max-w-7xl bg-black rounded-2xl p-2 sm:p-4 md:p-8 shadow-[6px_8px_24px_0px_rgba(253,230,0,0.2)] flex flex-col gap-6 items-center">
  <h1 className="text-center text-2xl font-anton text-[#fee600]">Administración de Clases</h1>
  <Link href="/admin/clases/todas" className="mt-2 mb-4 inline-block bg-[#fee600] text-black font-semibold px-4 py-2 rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors">Ver todas las clases</Link>
  {loading ? (
    <div className="text-[#fee600] py-8">Cargando clases...</div>
  ) : error ? (
    <div className="text-red-400 py-8">{error}</div>
  ) : (
    <>
      <form onSubmit={handleAddClase} className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600] col-span-1" />
        <input type="text" name="instructor" placeholder="Instructor" value={form.instructor} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600] col-span-1" />
        {/* Sede, Capacidad, Horarios, Duración en una fila */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-2">
          <input type="text" name="sede" placeholder="Sede" value={form.sede} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600]" />
          <input type="number" name="capacidad" placeholder="Capacidad" value={form.capacidad || ''} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600]" />
          <input type="text" name="duracion" placeholder="Duración (ej: 60min)" value={form.duracion} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600]" />
          <input type="date" name="horarios.fecha" placeholder="Fecha" value={form.horarios[0].fecha} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600]" />
          <input type="time" name="horarios.horaInicio" placeholder="Hora inicio" value={form.horarios[0].horaInicio} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600]" />
          <input type="time" name="horarios.horaFin" placeholder="Hora fin" value={form.horarios[0].horaFin} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600]" />
          <input type="text" name="imageUrl" placeholder="URL de imagen (opcional)" value={form.imageUrl} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full focus:ring-2 focus:ring-[#fee600]" />
        </div>
        {/* Selects en una fila */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
          <select name="intensidad" value={form.intensidad} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full">
            <option value="Muy Alta">Muy Alta</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
            <option value="Otros">Otros</option>
          </select>
          <select name="tipo" value={form.tipo} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full">
            <option value="Yoga">Yoga</option>
            <option value="Spinning">Spinning</option>
            <option value="Crossfit">Crossfit</option>
            <option value="Pilates">Pilates</option>
            <option value="Zumba">Zumba</option>
            <option value="Otros">Otros</option>
          </select>
          <select name="grupo_musculo" value={form.grupo_musculo} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full">
            <option value="Pierna">Pierna</option>
            <option value="Pecho">Pecho</option>
            <option value="Espalda">Espalda</option>
            <option value="Brazos">Brazos</option>
            <option value="Hombros">Hombros</option>
            <option value="Abdomen">Abdomen</option>
            <option value="Gluteo">Gluteo</option>
            <option value="Otros">Otros</option>
          </select>
          <select name="sub_musculo" value={form.sub_musculo} onChange={handleChange} className="border border-[#fee600] bg-black text-white px-2 py-1 rounded w-full">
            <option value="Biceps">Biceps</option>
            <option value="Triceps">Triceps</option>
            <option value="Hombros">Hombros</option>
            <option value="Dorsal">Dorsal</option>
            <option value="Cuadriceps">Cuadriceps</option>
            <option value="Abdominal">Abdominal</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} rows={3} className="border border-[#fee600] bg-black text-white px-2 py-2 rounded w-full focus:ring-2 focus:ring-[#fee600] col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 resize-none min-h-[60px]" />
        <div className="w-full flex justify-end mt-2 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
          <button type="submit" className="bg-[#fee600] text-black font-bold px-8 py-2 text-base rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors">Agregar</button>
        </div>
      </form>


    </>
  )}
      </div>
    </div>
  );
}
