import Joi, { ObjectSchema, ValidationResult } from 'joi';

const signinSchema: ObjectSchema<IUser> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateSignin: (payload: IUser) => ValidationResult = (payload) => {
  return signinSchema.validate(payload, { abortEarly: false });
};

export default validateSignin;
