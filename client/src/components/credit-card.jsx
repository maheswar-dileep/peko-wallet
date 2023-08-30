const creditCard = ({ username, uniqueId }) => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        {/* Card Front */}
        <div className="flex justify-between items-start mb-4">
          <div className="text-xl font-bold">Wallet</div>
          <div className="text-xl">
            <img src="https://img.icons8.com/ios/50/000000/chip.png" alt="Chip Icon" />
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-gray-600">Unique ID</div>
          <div className="text-gray-800 font-semibold">{uniqueId}</div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-gray-600">User Name</div>
          <div className="text-gray-800 font-semibold">{username}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-600">Expires</div>
          <div className="text-gray-800 font-semibold">12/100</div>
        </div>
      </div>
    </>
  );
};

export default creditCard;
