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
  if (filters) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.append(key, value);
      }
    });
    query = `?${params.toString()}`;
  }
  const token = Cookies.get("token");
  const res = await fetch(`${APIURL}/clases${query}`, {
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
