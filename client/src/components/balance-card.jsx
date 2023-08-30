const BalanceCard = () => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col items-center">
        <h2 className="font-medium text-2xl ">Rs 32000</h2>
        <span className="text-base ">Current Balance</span>

        <button
          type="button"
          className="rounded-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Transfer Fund
        </button>
      </div>
    </>
  );
};

export default BalanceCard;
