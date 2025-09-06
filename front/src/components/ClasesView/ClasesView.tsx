'use client';

import { useEffect, useState } from 'react';
import { preloadClases } from '@/helpers/preloadClases';
import { IClase } from '@/types';

export default function ClasesView() {
  const [filters, setFilters] = useState({
    tipo: '',
    grupo_musculo: '',
    sub_musculo: '',
    intensidad: '',
    instructor: ''
  });

  const [resultados, setResultados] = useState<IClase[]>([]);
  const [allClases, setAllClases] = useState<IClase[]>([]);
  const [loading, setLoading] = useState(false);

  // genera valores únicos para selects
  const uniqueOptions = (field: keyof IClase) =>
    Array.from(new Set(allClases.map(a => a[field]).filter(Boolean)));

  // opciones dependientes de grupo_musculo → sub_musculo
  const subMusculoOptions = () => {
    if (!filters.grupo_musculo) return uniqueOptions('sub_musculo');
    return Array.from(
      new Set(
        allClases
          .filter(a => a.grupo_musculo === filters.grupo_musculo)
          .map(a => a.sub_musculo)
          .filter(Boolean)
      )
    );
  };

  // simulamos la búsqueda (mock)
  const buscar = async () => {
    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 300)); // simula delay

      let data = preloadClases;

      data = data.filter(act =>
        (!filters.tipo || act.tipo === filters.tipo) &&
        (!filters.grupo_musculo || act.grupo_musculo === filters.grupo_musculo) &&
        (!filters.sub_musculo || act.sub_musculo === filters.sub_musculo) &&
        (!filters.intensidad || act.intensidad === filters.intensidad) &&
        (!filters.instructor || act.instructor === filters.instructor)
      );

      setResultados(data);

      if (allClases.length === 0) setAllClases(preloadClases);
    } catch (err) {
      console.error('Error en mock:', err);
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscar();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Clases de Gimnasio</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Select
          label="Tipo"
          value={filters.tipo}
          onChange={v => setFilters(f => ({ ...f, tipo: v, sub_musculo: '' }))}
          options={['', ...uniqueOptions('tipo')]}
        />
        <Select
          label="Grupo muscular"
          value={filters.grupo_musculo}
          onChange={v => setFilters(f => ({ ...f, grupo_musculo: v, sub_musculo: '' }))}
          options={['', ...uniqueOptions('grupo_musculo')]}
        />
        <Select
          label="Sub-músculo"
          value={filters.sub_musculo}
          onChange={v => setFilters(f => ({ ...f, sub_musculo: v }))}
          options={['', ...subMusculoOptions()]}
        />
        <Select
          label="Intensidad"
          value={filters.intensidad}
          onChange={v => setFilters(f => ({ ...f, intensidad: v }))}
          options={['', ...uniqueOptions('intensidad')]}
        />
        <Select
          label="Instructor"
          value={filters.instructor}
          onChange={v => setFilters(f => ({ ...f, instructor: v }))}
          options={['', ...uniqueOptions('instructor')]}
        />
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={buscar}
      >
        Buscar
      </button>

      {loading && <p>Cargando...</p>}
      {!loading && resultados.length === 0 && <p>No hay resultados</p>}

      <ul className="space-y-3 mt-4">
        {resultados.map(act => (
          <li
            key={act.id}
            className="p-3 border rounded flex items-center gap-3"
          >
            <img
              src={act.image}
              alt={act.nombre}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{act.nombre}</h3>
              <p>
                {act.tipo} · {act.intensidad} · {act.duracion} · {act.instructor}
              </p>
              <p>{act.descripcion}</p>
              <p>Horario: {act.horario}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Select({ label, value, onChange, options }: any) {
  return (
    <label className="flex flex-col text-sm">
      {label}
      <select
        className="p-2 border rounded"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o || 'Todos'}
          </option>
        ))}
      </select>
    </label>
  );
}
