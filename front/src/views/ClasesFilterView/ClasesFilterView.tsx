"use client";

import { useEffect, useMemo, useState } from "react";
import { getClases } from "@/services/clasesService";
import { IClase } from "@/types";
import ActivityCard from "@/components/Cards/ActivityCard";

type Filters = {
  tipo: string;
  grupo_musculo: string;
  sub_musculo: string;
  intensidad: string;
  instructor: string;
};

const INITIAL_FILTERS: Filters = {
  tipo: "",
  grupo_musculo: "",
  sub_musculo: "",
  intensidad: "",
  instructor: "",
};

const SELECTS: { key: keyof Filters; label: string }[] = [
  { key: "tipo", label: "Tipo" },
  { key: "grupo_musculo", label: "Grupo muscular" },
  { key: "sub_musculo", label: "Sub-músculo" },
  { key: "intensidad", label: "Intensidad" },
  { key: "instructor", label: "Instructor" },
];

export default function ClasesFilterView() {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [allClases, setAllClases] = useState<IClase[]>([]);
  const [resultados, setResultados] = useState<IClase[]>([]);
  const [loading, setLoading] = useState(false);
  // ...existing code...

  const hasFilters = useMemo(
    () => Object.values(filters).some(Boolean),
    [filters]
  );

  const uniques = (arr: unknown[]) => [...new Set(arr.map(String).filter(Boolean))];

  type OptionMap = {
    tipo: string[];
    grupo_musculo: string[];
    sub_musculo: string[];
    intensidad: string[];
    instructor: string[];
  };

  const options: OptionMap = useMemo(() => {
    return {
      tipo: [...new Set(allClases.map((a) => a.tipo).filter(Boolean))],
      grupo_musculo: [...new Set(
        allClases.flatMap((a) => Array.isArray(a.grupo_musculo) ? a.grupo_musculo.filter(Boolean) : [a.grupo_musculo])
      )],
      intensidad: [...new Set(allClases.map((a) => a.intensidad).filter(Boolean))],
      instructor: [...new Set(allClases.map((a) => a.instructor).filter(Boolean))],
      sub_musculo: [...new Set(
        (filters.grupo_musculo
          ? allClases.filter((a) => Array.isArray(a.grupo_musculo) ? a.grupo_musculo.includes(filters.grupo_musculo) : a.grupo_musculo === filters.grupo_musculo)
          : allClases
        ).flatMap((a) => Array.isArray(a.sub_musculo) ? a.sub_musculo.filter(Boolean) : [])
      )],
    };
  }, [allClases, filters.grupo_musculo]);

  const buscar = async () => {
    setLoading(true);
    // Log de los filtros enviados
    const filtrosBackend = {
      ...filters,
      grupo_musculo: filters.grupo_musculo ? [filters.grupo_musculo] : undefined,
      sub_musculo: filters.sub_musculo ? [filters.sub_musculo] : undefined,
    };
    console.log('[DEBUG] Filtros enviados al backend:', filtrosBackend);

    // Construye la query igual que en getClases
    const params = new URLSearchParams();
    Object.entries(filtrosBackend).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.append(key, value);
      }
    });
    const query = params.toString();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/clases${query ? `?${query}` : ''}`;
    console.log('[DEBUG] URL de la petición:', apiUrl);

    try {
      const data = await getClases(filtrosBackend);
      console.log('[DEBUG] Respuesta filtrada:', data);
      setResultados(data);
      if (!allClases.length) setAllClases(data);
    } catch {
      setResultados([]);
    }
    setLoading(false);
  };

  const resetFilters = async () => {
    setFilters(INITIAL_FILTERS);
    setLoading(true);
    try {
      const data = await getClases();
      setResultados(data);
      setAllClases(data);
    } catch {
      setResultados([]);
    }
    setLoading(false);
  };

  // carga inicial
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getClases();
        console.log('[DEBUG] Todas las clases recibidas:', data);
        setAllClases(data);
        setResultados(data);
      } catch {
        setAllClases([]);
        setResultados([]);
      }
      setLoading(false);
    })();
  }, []);

  // si todos vacíos → mostrar todo
  useEffect(() => {
    if (Object.values(filters).every((v) => !v)) {
      setResultados(allClases);
    }
  }, [filters, allClases]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Clases de Gimnasio</h1>

      {/* Selects compactos */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {SELECTS.map(({ key, label }) => (
          <Select
            key={key}
            label={label}
            value={filters[key]}
            onChange={(v: string) =>
              setFilters((f) => ({
                ...f,
                [key]: v,
                ...(key === "grupo_musculo" || key === "tipo" ? { sub_musculo: "" } : {}),
              }))
            }
            options={["", ...options[key]]}
            disabled={key === "sub_musculo" && !filters.grupo_musculo}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          className="px-4 py-2 rounded-md border bg-black border-[#fee600] text-[#fee600] font-semibold hover:bg-[#fee600] hover:text-black transition cursor-pointer"
          onClick={buscar}
          disabled={loading}
        >
          {loading ? "Buscando…" : "Buscar"}
        </button>

        {hasFilters && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-md border bg-black border-[#fee600] text-[#fee600] font-semibold hover:bg-[#fee600] hover:text-black transition cursor-pointer"
              >
            Reiniciar filtros
          </button>
        )}
      </div>

      {loading && <p>Cargando...</p>}
      {!loading && resultados.length === 0 && <p>No hay resultados</p>}

      <div className="grid mb-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-full mx-auto">
        {resultados.map((clase) => (
          <ActivityCard
            key={clase.id}
            {...clase}              // pasa todos los campos de IClase
          
          />
          
        ))}
      </div>
    </div>
  );
}

/* ---------- UI pequeños y reutilizables ---------- */

function Select({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <label className="flex flex-col text-sm">
      {label}
      <select
        className="p-2 border rounded disabled:bg-neutral-100 disabled:text-neutral-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {options.map((o) => (
          <option key={o || "todos"} value={o}>
            {o || "Todos"}
          </option>
        ))}
      </select>
    </label>
  );
}
