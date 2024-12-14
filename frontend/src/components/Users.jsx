import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loggedInUserId = localStorage.getItem("userId"); // Get the logged-in user's ID

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        // Filter out the logged-in user from the list
        const filteredUsers = response.data.user.filter(
          (user) => user._id !== loggedInUserId
        );
        setUsers(filteredUsers);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load users. Please try again.");
        setLoading(false);
      });
  }, [filter, loggedInUserId]); // Add loggedInUserId as a dependency

  return (
    <div className="px-4 py-6">
      {/* Users Heading */}
      <div className="font-bold mt-6 text-xl sm:text-2xl">
        Users
      </div>

      {/* Search Input */}
      <div className="my-4">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />
      </div>

      {/* Loading/Error States */}
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* User List */}
      <div className="space-y-4">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      {/* User Info */}
      <div className="flex items-center space-x-4">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center text-2xl text-white">
          {user.firstName[0]}
        </div>
        <div className="flex flex-col">
          <div className="font-medium text-lg">
            {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
          </div>
          <div className="text-sm text-gray-500">
            {user.email}
          </div>
        </div>
      </div>

      {/* Send Money Button */}
      <div>
        <Button
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label="Send Money"
        />
      </div>
    </div>
  );
}
