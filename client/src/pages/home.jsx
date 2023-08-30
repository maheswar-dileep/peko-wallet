import BalanceCard from '../components/balance-card';
import CreditCard from '../components/credit-card';
import Navbar from '../components/navbar';

const home = () => {
  return (
    <>
      <Navbar />
      <div className="w-max mx-auto h-auto ">
        <div className="bg-white p-6 rounded-lg shadow-md w-100 grid md:grid-cols-2 gap-4">
          <CreditCard />
          <BalanceCard />
        </div>
      </div>
    </>
  );
};

export default home;
