import { useState } from 'react';
import authApi from '../utils/axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AddAmount = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState();

  const addAmount = async (amount) => {
    const res = await authApi.put('/payment/add-amount', {
      amount,
      id: localStorage.getItem('userId'),
    });
    if (res.data.success) navigate('/');
  };

  return (
    <>
      <div className="w-max mx-auto h-auto ">
        <div className="flex w-full items-center space-x-2 md:w-1/3">
          <input
            className="flex w-48 h-10 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => addAmount(amount)}
          >
            Add Amount
          </button>
        </div>
      </div>
    </>
  );
};

export default AddAmount;
