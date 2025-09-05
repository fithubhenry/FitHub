'use client';

import { preloadClases } from '@/helpers/preloadClases';
import { useState } from 'react';


export default function ClasesView() {
  const [filters, setFilters] = useState({
    grupo_musculo: '',
    sub_musculo: '',
    intensidad: '',
    instructor: ''
  });

  const [resultados, setResultados] = useState(preloadClases);
  const [loading, setLoading] = useState(false);

  // Genera valores únicos para los selects
  const uniqueOptions = (field: string) =>
    Array.from(new Set(preloadClases.map(a => a[field])));

  const buscar = () => {
    setLoading(true);
    const filtradas = preloadClases.filter(act =>
      (!filters.grupo_musculo || act.grupo_musculo === filters.grupo_musculo) &&
      (!filters.sub_musculo || act.sub_musculo === filters.sub_musculo) &&
      (!filters.intensidad || act.intensidad === filters.intensidad) &&
      (!filters.instructor || act.instructor === filters.instructor)
    );
    setResultados(filtradas);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Clases de Gimnasio</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Select label="Grupo muscular" value={filters.grupo_musculo} onChange={v => setFilters(f => ({ ...f, grupo_musculo: v }))}
          options={['', ...uniqueOptions('grupo_musculo')]} />
        <Select label="Sub-músculo" value={filters.sub_musculo} onChange={v => setFilters(f => ({ ...f, sub_musculo: v }))}
          options={['', ...uniqueOptions('sub_musculo')]} />
        <Select label="Intensidad" value={filters.intensidad} onChange={v => setFilters(f => ({ ...f, intensidad: v }))}
          options={['', ...uniqueOptions('intensidad')]} />
        <Select label="Instructor" value={filters.instructor} onChange={v => setFilters(f => ({ ...f, instructor: v }))}
          options={['', ...uniqueOptions('instructor')]} />
      </div>

      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={buscar}>Buscar</button>

      {loading && <p>Cargando...</p>}
      {!loading && resultados.length === 0 && <p>No hay resultados</p>}

      <ul className="space-y-3 mt-4">
        {resultados.map(act => (
          <li key={act.id} className="p-3 border rounded flex items-center gap-3">
            <img src={act.image} alt={act.nombre} className="w-20 h-20 object-cover rounded" />
            <div>
              <h3 className="font-semibold">{act.nombre}</h3>
              <p>{act.tipo} · {act.intensidad} · {act.duracion} · {act.instructor}</p>
              <p>{act.descripcion}</p>
              <p>Horario: {act.horario}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Select({label, value, onChange, options}: any) {
  return (
    <label className="flex flex-col text-sm">
      {label}
      <select className="p-2 border rounded" value={value} onChange={e => onChange(e.target.value)}>
        {options.map((o: string) => <option key={o} value={o}>{o || 'Todos'}</option>)}
      </select>
    </label>
  );
}