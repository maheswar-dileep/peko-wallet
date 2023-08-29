import Joi from 'joi';
const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
const validateSignin = (payload) => {
    return signinSchema.validate(payload, { abortEarly: false });
};
export default validateSignin;
//# sourceMappingURL=signin.js.map