import { ILoginUser, IRegisterUser } from "@/types";

export const ValidateRegisterUser = (values: IRegisterUser) => {
    const errors: { name?: string, email?: string, password?: string, address?: string, phone?: string } = {};

    // Validación de nombre
    if (!values.name) {
        errors.name = 'El nombre es requerido';
    } else if (/^\d+$/.test(values.name)) {
        // Si son solo números
        errors.name = 'El nombre no puede contener  números';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.name)) {
        // Si contiene algo que no sean letras o espacios
        errors.name = 'El nombre solo puede contener letras y espacios';
    } else if (values.name.length < 2) {
        // Si tiene menos de 2 caracteres
        errors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (values.name.length > 50) {
        // Máximo 50
        errors.name = 'El nombre no puede tener más de 50 caracteres';
    }

    // Validación de email
    if (!values.email) {
        errors.email = 'El email es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Email inválido';
    }

    // Validación de contraseña
    if (!values.password) {
        errors.password = 'La contraseña es requerida';
    } else if (values.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validación de dirección
    if (!values.address) {
        errors.address = 'La dirección es requerida';
    } else if (values.address.length < 5) {
        errors.address = 'La dirección debe tener al menos 5 caracteres';
    }

    // Validación de teléfono
    if (!values.phone) {
        errors.phone = 'El teléfono es requerido';
    } else if (values.phone.length !== 10) {
        errors.phone = 'El teléfono debe tener 10 dígitos';
    }

    return errors;
};

export const ValidateLoginUser = (values: ILoginUser) => {
    const errors: { email?: string, password?: string } = {};

    if (!values.email) {
        errors.email = 'El email es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Email inválido';
    }

    if (!values.password) {
        errors.password = 'La contraseña es requerida';
    }

    return errors;
};
