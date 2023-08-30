import * as yup from 'yup';

const transferSchema = yup.object().shape({
  uniqueId: yup
    .string()
    .required('uniqueId is required')
    .matches(/^[a-zA-Z0-9]{6}$/, 'uniqueId must be exactly 6 digits'),
  amount: yup.number().required(),
  password: yup.string().min(6).required('password is required'),
});

export default transferSchema;
