import Joi, { ObjectSchema, ValidationResult } from 'joi';

interface IAddAmount {
  id: string;
  amount: number;
}

const AddAmountSchema: ObjectSchema<IAddAmount> = Joi.object({
  id: Joi.string().required(),
  amount: Joi.number().max(99999).required(),
});

const validateAddAmount: (payload: IAddAmount) => ValidationResult = (payload) => {
  return AddAmountSchema.validate(payload, { abortEarly: false });
};

export default validateAddAmount;
