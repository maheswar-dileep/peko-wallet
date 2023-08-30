interface IUser {
  username: string;
  email: string;
  password: string;
  uniqueId: string;
  balance: number;
  transactionHistory: Array<object>;
}

interface IOTP {
  email: string;
  code: string;
  createdAt: Date;
}
