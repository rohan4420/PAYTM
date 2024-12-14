import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Appbar />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:p-8 md:p-12 bg-white rounded-lg shadow-lg mx-auto mt-6 mb-10 w-full max-w-7xl">
        {/* Balance Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Balance value={"10,000"} />
          </div>

          {/* Users Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
};
