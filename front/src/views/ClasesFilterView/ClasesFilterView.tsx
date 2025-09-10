"use client";

import { useEffect, useMemo, useState } from "react";
import { preloadClases } from "@/helpers/preloadClases";
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

  // ¿hay filtros activos?
  const hasFilters = useMemo(
    () => Object.values(filters).some(Boolean),
    [filters]
  );

  // opciones únicas (como string)
  const uniques = (arr: unknown[]) =>
    [...new Set(arr.map(String).filter(Boolean))];

  type OptionMap = {
    tipo: string[];
    grupo_musculo: string[];
    sub_musculo: string[];
    intensidad: string[];
    instructor: string[];
  };

  // opciones para cada select (sub_musculo depende del grupo_musculo)
  const options: OptionMap = useMemo(() => {
    const base: OptionMap = {
      tipo: uniques(allClases.map((a) => a.tipo)),
      grupo_musculo: uniques(allClases.map((a) => a.grupo_musculo)),
      intensidad: uniques(allClases.map((a) => a.intensidad)),
      instructor: uniques(allClases.map((a) => a.instructor)),
      sub_musculo: uniques(
        (filters.grupo_musculo
          ? allClases.filter((a) => a.grupo_musculo === filters.grupo_musculo)
          : allClases
        ).map((a) => a.sub_musculo)
      ),
    };
    return base;
  }, [allClases, filters.grupo_musculo]);

  // aplica todos los filtros dinámicamente
  const applyFilters = (data: IClase[]) =>
    data.filter((a) =>
      (Object.keys(filters) as (keyof Filters)[]).every(
        (k) => !filters[k] || String((a as any)[k]) === filters[k]
      )
    );

  const buscar = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    const data = applyFilters(preloadClases);
    setResultados(data); // ← NO mostrar allClases si no hay resultados
    if (!allClases.length) setAllClases(preloadClases);
    setLoading(false);
  };


  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setResultados(allClases.length ? allClases : preloadClases);
  };

  // carga inicial
  useEffect(() => {
    setAllClases(preloadClases);
    setResultados(preloadClases);
  }, []);

  // si todos vacíos → mostrar todo
  useEffect(() => {
    if (Object.values(filters).every((v) => !v))
      setResultados(allClases.length ? allClases : preloadClases);
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
                ...(key === "grupo_musculo" || key === "tipo"
                  ? { sub_musculo: "" }
                  : {}),
              }))
            }
            options={["", ...options[key]]}
            disabled={key === "sub_musculo" && !filters.grupo_musculo}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          className="px-4 py-2 bg-black text-white rounded"
          onClick={buscar}
          disabled={loading}
        >
          {loading ? "Buscando…" : "Buscar"}
        </button>

        {hasFilters && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded border border-neutral-300 hover:bg-neutral-50"
          >
            Reiniciar filtros
          </button>
        )}
      </div>

      {loading && <p>Cargando...</p>}
      {!loading && resultados.length === 0 && <p>No hay resultados</p>}

      {/* Cards horizontales: imagen sin recorte y altura limitada (sin “huecos”) */}
      <div className="grid mb-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {resultados.map((clase) => (
          <ActivityCard
              key={clase.id}
              id={clase.id}
              nombre={clase.nombre}
              descripcion={clase.descripcion}
              duracion={clase.duracion}
              participantes={clase.participantes}
              intensidad={clase.intensidad}
              image={`${clase.image}`} // ojo: debe existir la imagen en /public/images
              instructor={""} horario={""} capacidad={0} tipo={"Yoga"} grupo_musculo={"Pierna"} sub_musculo={"biceps"} sede={""}            />
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

function Meta({ k, v, span = false }: { k: string; v: string; span?: boolean }) {
  return (
    <p className={span ? "sm:col-span-2" : ""}>
      <span className="font-medium">{k}:</span> {v}
    </p>
  );
}