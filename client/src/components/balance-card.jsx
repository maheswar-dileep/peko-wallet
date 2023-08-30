import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BalanceCard = ({ balance }) => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col items-center">
        <h2 className="font-medium text-2xl ">Rs {balance}</h2>
        <span className="text-base ">Current Balance</span>

        <Link
          to="/new-transaction"
          className="rounded-full m-4 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Transfer Fund
        </Link>
        <Link
          to="/add-amount"
          className="rounded-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add amount to wallet
        </Link>
      </div>
    </>
  );
};

BalanceCard.propTypes = {
  balance: PropTypes.number.isRequired,
};

export default BalanceCard;
