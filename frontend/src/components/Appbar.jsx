import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();
  const owner = localStorage.getItem("username");
  
  // Safely handle user data for display
  const username = owner ? owner.toUpperCase() : "User";

  const handleLogout = () => {
    // Clear sensitive data
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    // Redirect to sign-in page
    navigate("/signin");
  };

  return (
    <div className="shadow-md h-16 flex justify-between items-center px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Logo/Title Section */}
      <div className="font-bold text-lg hover:text-yellow-300 transition-all duration-300 cursor-pointer">
        PayTM App
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Greeting Text */}
        <div className="text-sm sm:text-base font-medium">
          <span className="hover:underline">Hello, {owner.toUpperCase()}</span>
        </div>

        {/* Profile Avatar */}
        <div className="relative group">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center text-xl font-bold text-gray-700 cursor-pointer hover:scale-105 transform transition-transform duration-300">
            {/* Display the first letter of the username */}
            {owner ? owner[0].toUpperCase() : "U"}
          </div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
