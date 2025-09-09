import * as yup from 'yup';

export const validateFormLogin = yup.object({
    email: yup.string().email('El email debe ser válido').required('El email debe ser valido'),
    password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required('La contraseña es obligatoria'),
});


export const validateFormRegister = yup.object({
    email: yup.string()
        .email('El email no es válido')
        .required('El email es obligatorio'),

    password: yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),

    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('La confirmación de la contraseña es obligatoria'),

    name: yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .required('El nombre es obligatorio'),

    lastname: yup.string()
        .min(4, 'El apellido debe tener al menos 4 caracteres')
        .required('El apellido es obligatorio'),

    birthdate: yup.date()
        .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro')
        .required('La fecha de nacimiento es obligatoria'),

    city: yup.string()
        .min(3, 'La ciudad debe tener al menos 3 caracteres')
        .required('La ciudad es obligatoria'),

    address: yup.string()
        .min(5, 'La dirección debe tener al menos 5 caracteres')
        .required('La dirección es obligatoria'),

    phone: yup.string()
        .required('El teléfono es obligatorio'),
});


// nombre
// apellido
// telefono
// fecha de nacimiento
// direccion
// ciudad
// password
// email