import Joi, { ObjectSchema, ValidationResult } from 'joi';

const transferAmountSchema: ObjectSchema<IUser> = Joi.object({
  id: Joi.string().required(),
  uniqueId: Joi.string().equal(6).required(),
  amount: Joi.number().required(),
  password: Joi.string().required(),
});

const transferAmountValidation: (payload: IUser) => ValidationResult = (payload) => {
  return transferAmountSchema.validate(payload, { abortEarly: false });
};

export default transferAmountValidation;
