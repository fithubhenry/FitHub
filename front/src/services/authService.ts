import { ILoginUser, IRegisterUser } from "@/types";
import { toast } from "react-toastify";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function register(userData: IRegisterUser) {
  try {
    const response = await fetch(`https://fithub-back-dev.onrender.com/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }

    const parsedResponse = await response.json();

    // Si el backend devuelve el objeto usuario creado
    if (parsedResponse && parsedResponse.id) {
      toast.success("Usuario registrado correctamente");
      return parsedResponse; // devolvés el usuario creado
    } else {
      toast.error("Fallo al registrar el usuario");
    }
  } catch (error: any) {
    toast.error("Fallo al registrar el usuario: " + error.message);
    throw new Error(error);
  }
}


export async function login(userData: ILoginUser) {
  try {
    console.log("Intentando loguear con:", userData);

    const response = await fetch("https://fithub-back-dev.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    const parsedResponse = await response.json();

    if (parsedResponse.access_token) {
      // Guardar token en localStorage
      localStorage.setItem("token", parsedResponse.access_token);

      toast.success("Usuario logueado correctamente");
      return parsedResponse;
    } else {
      toast.error("Fallo al loguear el usuario");
    }
  } catch (error: any) {
    toast.error("Fallo al loguear el usuario: " + error.message);
    throw new Error(error);
  }
}

