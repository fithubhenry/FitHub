import { ILoginUser, IRegisterUser } from "@/types";
import { toast } from "react-toastify";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function register(userData: IRegisterUser) {
    try {
        const response = await fetch(`${APIURL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const parsedResponse = await response.json()
        if (parsedResponse.name) {
            toast.success("Usuario registrado correctament")
            return response.json();
        } else {
            toast.error("Fallo al registrar el usuario");
        }

    } catch (error: any) {
        toast.error("Fallo al registrar el usuario:" + error.message);
        throw new Error(error);
    }
}

export async function login(userData: ILoginUser) {
    try {
        const response = await fetch(`${APIURL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const parsedResponse = await response.json()
        if (parsedResponse.login) {
            toast.success("Usuario Logueado correctamente");
            return parsedResponse;
        } else {
            toast.error("Fallo al loguear el usuario");

        }

    } catch (error: any) {
        toast.error("Fallo al loguear el usuario:" + error.message);
        throw new Error(error);
    }
}
