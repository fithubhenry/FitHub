"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { preloadClases } from "@/helpers/preloadClases";
import { IClase } from "@/types";
import Link from "next/link";

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
      <section className="mt-6 space-y-6">
        {resultados.map((act) => (
          <Link key={act.id} href={`/clases/${act.id}`}>
            <article
              className="mt-5 grid grid-cols-1 md:grid-cols-[minmax(280px,340px)_1fr] rounded-3xl bg-white ring-1 ring-black/5 overflow-hidden"
            >
              <div className="p-0 flex justify-center">
                <Image
                  src={`/${String(act.image).replace(/^\//, "")}`}
                  alt={act.nombre}
                  width={1200}
                  height={800}
                  className="block w-auto h-auto max-h-[320px] object-contain"
                  sizes="(max-width: 768px) 100vw, 340px"
                  priority={false}
                />
              </div>

              <div className="p-5 md:p-6 flex flex-col justify-center gap-2">
                <h3 className="text-xl font-semibold leading-tight">
                  {act.nombre}
                </h3>
                <p className="text-sm text-neutral-600">{act.descripcion}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-sm text-neutral-800 mt-2">
                  <Meta k="Tipo" v={act.tipo} />
                  <Meta k="Intensidad" v={act.intensidad} />
                  <Meta k="Duración" v={act.duracion} />
                  <Meta k="Instructor" v={act.instructor} />
                  <Meta k="Horario" v={act.horario} />
                  <Meta k="Sede" v={act.sede} />
                  <Meta
                    k="Grupo/Submúsculo"
                    v={`${act.grupo_musculo} / ${act.sub_musculo}`}
                    span
                  />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
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