const creditCard = () => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        {/* Card Front */}
        <div className="flex justify-between items-start mb-4">
          <div className="text-xl font-bold">Credit Card</div>
          <div className="text-xl">
            <img src="https://img.icons8.com/ios/50/000000/chip.png" alt="Chip Icon" />
          </div>
        </div>
        <div className="text-gray-600 mb-4">1234 5678 9012 3456</div>
        <div className="flex justify-between mb-4">
          <div className="text-gray-600">Card Holder</div>
          <div className="text-gray-800 font-semibold">John Doe</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-600">Expires</div>
          <div className="text-gray-800 font-semibold">12/24</div>
        </div>
      </div>
    </>
  );
};

export default creditCard;
