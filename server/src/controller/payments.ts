import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import validateAddAmount from '../helpers/validations/addAmount.js';
import { User } from '../model/user.js';
import transferAmountValidation from '../helpers/validations/transferAmount.js';

//*--- add amount ---*//

export const addAmount = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateAddAmount(req.body);
    if (error) return res.status(422).send(error.details[0]?.message);

    const userExists = await User.findOne({ _id: value?.id });
    if (!userExists) return res.status(405).send({ success: false, message: 'user does not exist' });

    const transaction = {
      transactionType: 'Self',
      senderUniqueId: 'nill',
      amount: value.amount,
    };

    const user = await User.updateOne(
      { _id: value.id },
      {
        $inc: { balance: value.amount },
        $push: { transactionHistory: transaction },
      }
    );

    return res.status(200).send({ success: true, message: 'balance updated successfully', user });
  } catch (error) {
    return res.status(500).send({ success: false, err: error });
  }
};

//*--- transfer amount ---*//

export const transferAmount = async (req: Request, res: Response) => {
  try {
    const { error, value } = transferAmountValidation(req.body);

    const userExists: IUser = await User.findOne({ _id: value?.id });
    if (!userExists) return res.status(405).send({ success: false, message: 'user does not exist' });

    const match = await bcrypt.compare(value?.password, userExists?.password);

    if (!match) return res.status(406).send({ err: 'password' });

    if (userExists.balance - value.amount < 0)
      return res.status(406).send({ success: false, message: 'insufficient balance' });

    const updateTransaction = {
      transactionType: 'Send',
      senderUniqueId: 'nill',
      amount: value.amount,
    };

    await User.updateOne(
      { _id: value.id },
      {
        $inc: { balance: -value.amount },
        $push: { transactionHistory: updateTransaction },
      }
    );

    const transaction = {
      transactionType: 'Recieved',
      senderUniqueId: value.uniqueId,
      amount: value.amount,
    };

    const user = await User.updateOne(
      { uniqueId: value.uniqueId },
      {
        $inc: { balance: value.amount },
        $push: { transactionHistory: transaction },
      }
    );

    return res.status(200).send({ success: true, message: 'amount transfered successfully', user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, err: error });
  }
};


//*--- request amount ---*//

export const requestAmount =async (req:Request,res:Response) => {
  try {
    
  } catch (error) {
    return res.status(500).send({ success: false, err: error });
  }
}