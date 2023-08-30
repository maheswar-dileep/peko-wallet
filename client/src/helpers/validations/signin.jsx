import * as yup from 'yup';

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const signInSchema = yup.object().shape({
  email: yup.string().matches(emailRegExp, 'Invalid email address').required('Email is required'),
  password: yup.string().min(6).required('password is required'),
});

export default signInSchema;
