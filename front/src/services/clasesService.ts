import { IClase } from "@/types";
import Cookies from "js-cookie";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getClases(filters?: {
  tipo?: string;
  grupo_musculo?: string | string[];
  sub_musculo?: string | string[];
  intensidad?: string;
  instructor?: string;
}): Promise<IClase[]> {
  let query = "";
  let endpoint = "/clases";
  if (filters && Object.values(filters).some(Boolean)) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.append(key, value);
      }
    });
    query = `?${params.toString()}`;
    endpoint = "/clases/filtros";
  }
  const token = Cookies.get("token");
  const url = `${APIURL}${endpoint}${query}`;
  console.log('[DEBUG] URL real de la petición:', url);
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Error al obtener las clases");
  return await res.json();
}

export async function getClaseById(id: string): Promise<IClase> {
  const token = Cookies.get("token");
  const res = await fetch(`${APIURL}/clases/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Error al obtener la clase");
  return await res.json();
}
