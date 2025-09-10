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
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'El nombre solo puede contener letras')
        .required('El nombre es obligatorio'),

    lastname: yup.string()
        .min(4, 'El apellido debe tener al menos 4 caracteres')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'El apellido solo puede contener letras')
        .required('El apellido es obligatorio'),

    birthdate: yup.string()
        .required('La fecha de nacimiento es requerida')
        .test('is-valid-date', 'La fecha no es válida', (value) => {
            if (!value) return false;
            return !isNaN(new Date(value).getTime());
        }),

    city: yup.string()
        .min(3, 'La ciudad debe tener al menos 3 caracteres')
        .required('La ciudad es obligatoria'),

    address: yup.string()
        .min(5, 'La dirección debe tener al menos 5 caracteres')
        .required('La dirección es obligatoria'),

    phone: yup.string()
        .matches(/^\+?[0-9]+$/, 'El teléfono solo puede contener números')
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