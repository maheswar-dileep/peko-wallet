import mongoose, { Document } from 'mongoose';

interface UserDocument extends IUser, Document {}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      min: [3, 'username atleast contain 3 characters'],
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      min: [4, 'password must have fout characters'],
    },
    uniqueId: {
      type: String,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactionHistory: [
      {
        transactionDate: {
          type: Date,
          default: Date.now,
        },
        transactionType: String,
        senderUniqueId: String,
        amount: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<UserDocument>('User', userSchema);
