import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email().required('email field is required'),
    password: Yup.string().required('password field is required')
});

export const signUpSchema = Yup.object({
    firstname: Yup.string().min(2).max(20).required('firstname field is required'),
    lastname: Yup.string().min(2).max(20).required('lastname field is required'),
    email: Yup.string().email().required('email field is required'),
    password: Yup.string().min(6).required('password field is required'),
    imageFile: Yup.mixed().required()
});
