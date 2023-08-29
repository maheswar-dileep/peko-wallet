import Joi from 'joi';
const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().min(3).required(),
});
const validateSignup = (payload) => {
    return signupSchema.validate(payload, { abortEarly: false });
};
export default validateSignup;
//# sourceMappingURL=signup.js.map