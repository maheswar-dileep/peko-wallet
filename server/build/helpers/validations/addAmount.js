import Joi from 'joi';
const AddAmountSchema = Joi.object({
    id: Joi.string().required(),
    amount: Joi.number().max(99999).required(),
});
const validateAddAmount = (payload) => {
    return AddAmountSchema.validate(payload, { abortEarly: false });
};
export default validateAddAmount;
//# sourceMappingURL=addAmount.js.map