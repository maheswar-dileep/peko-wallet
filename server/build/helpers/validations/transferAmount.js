import Joi from 'joi';
const transferAmountSchema = Joi.object({
    id: Joi.string().required(),
    uniqueId: Joi.string().equal(6).required(),
    amount: Joi.number().required(),
    password: Joi.string().required(),
});
const transferAmountValidation = (payload) => {
    return transferAmountSchema.validate(payload, { abortEarly: false });
};
export default transferAmountValidation;
//# sourceMappingURL=transferAmount.js.map