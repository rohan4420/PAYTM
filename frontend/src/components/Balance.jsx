import { FaWallet } from 'react-icons/fa'; // For Wallet Icon

export const Balance = ({ value }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-xl shadow-xl w-full sm:w-3/4 lg:w-1/3 max-w-2xl mx-auto transform transition-all duration-300 hover:scale-105">
      {/* Icon and Title Section */}
      <div className="flex items-center space-x-4">
        <FaWallet className="text-white text-3xl" />
        <div className="font-semibold text-2xl sm:text-xl text-white">
          Your Current Balance
        </div>
      </div>

      {/* Value Section */}
      <div className="font-bold ml-0 sm:ml-4 mt-2 sm:mt-0 text-2xl sm:text-3xl text-white">
        ₹{value}
      </div>
    </div>
  );
};
