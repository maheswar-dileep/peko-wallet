import Joi, { ObjectSchema, ValidationResult } from 'joi';

const signupSchema: ObjectSchema<IUser> = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().min(3).required()
});


const validateSignup: (payload: IUser) => ValidationResult = (payload) => {
    return signupSchema.validate(payload, { abortEarly: false });
};

export default validateSignup;