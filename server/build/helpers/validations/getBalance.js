import Joi from 'joi';
const getBalanceSchema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
});
const getBalanceValidation = (payload) => {
    return getBalanceSchema.validate(payload, { abortEarly: false });
};
export default getBalanceValidation;
//# sourceMappingURL=getBalance.js.map