// src/services/api.ts
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function getAuthHeaders() {
  let token = "";
  if (typeof window !== "undefined") {
    token =
      Cookies.get("token") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("token") ||
      "";
  }
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

const api = {
  get: async (path: string) => {
    const res = await fetch(BASE_URL + path, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Error en GET " + path);
    return res.json();
  },
  post: async (path: string, body: any) => {
    const res = await fetch(BASE_URL + path, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Error en POST " + path);
    return res.json();
  },
  patch: async (path: string, body: any) => {
    const res = await fetch(BASE_URL + path, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Error en PATCH " + path);
    return res.json();
  },
  delete: async (path: string) => {
    const res = await fetch(BASE_URL + path, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Error en DELETE " + path);
    return res.json();
  },
};

export default api;
