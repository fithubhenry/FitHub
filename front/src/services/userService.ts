import { User } from "@/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserById(id: string): Promise<User> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${APIURL}/users/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Error al obtener el usuario");
  return await res.json();
}
