import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTransaction = async () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        { to: id, amount },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      if (response.status === 200) {
        toast.success("Transaction completed successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light"
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      toast.error("Transaction failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
      {/* Popup Container with Smooth Animation */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 space-y-6 transform transition-all duration-500 ease-out scale-100 opacity-100">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 transition-all duration-300">Send Money</h2>

        {/* Recipient Information */}
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl transition-all duration-300">
            {name[0].toUpperCase()}
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium text-gray-700">
            Amount (in Rs)
          </label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            id="amount"
            className="w-full h-12 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
            placeholder="Enter amount"
          />
        </div>

        {/* Transfer Button */}
        <button
          onClick={handleTransaction}
          disabled={isLoading}
          className={`w-full h-12 rounded-lg font-semibold transition duration-300 ease-in-out ${isLoading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white`}
        >
          {isLoading ? "Processing..." : "Initiate Transfer"}
        </button>

        {/* Cancel Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};
