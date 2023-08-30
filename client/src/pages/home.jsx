import { useEffect, useState } from 'react';
import BalanceCard from '../components/balance-card';
import CreditCard from '../components/credit-card';
import Navbar from '../components/navbar';
import authApi from '../utils/axios/axiosInstance';

const Home = () => {
  const [balance, setBalance] = useState();
  const username = localStorage.getItem('userName');
  const uniqueId = localStorage.getItem('uniqueId');

  useEffect(() => {
    const getBalance = async () => {
      const res = await authApi.get(`/payment/get-balance/${localStorage.getItem('userId')}`);
      console.log(res);
      setBalance(res.data.balance);
    };
    getBalance();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-max mx-auto h-auto ">
        <div className="bg-white p-6 rounded-lg shadow-md w-100 grid md:grid-cols-2 gap-4">
          <CreditCard username={username} uniqueId={uniqueId} />
          <BalanceCard balance={balance} />
        </div>
      </div>
    </>
  );
};

export default Home;
