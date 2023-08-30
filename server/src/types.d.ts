interface IUser {
  username: string;
  email: string;
  password: string;
  uniqueId: string;
  balance: number;
  transactionHistory: Array<object>;
}
