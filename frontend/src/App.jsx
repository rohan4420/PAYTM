import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

function App() {
  // Check if the user is logged in by looking for the token in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected Routes (Only accessible when authenticated) */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
        />
        <Route
          path="/send"
          element={isAuthenticated ? <SendMoney /> : <Navigate to="/signin" />}
        />

        {/* Default Route (Redirect to Signin page if no route matches) */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
