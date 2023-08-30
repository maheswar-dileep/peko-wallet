import Joi from 'joi';
const requestAmountSchema = Joi.object({
    id: Joi.string().required(),
    uniqueId: Joi.string().equal(6).required(),
});
const requestAmountValidation = (payload) => {
    return requestAmountSchema.validate(payload, { abortEarly: false });
};
export default requestAmountValidation;
//# sourceMappingURL=requestAmount.js.map