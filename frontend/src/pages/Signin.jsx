import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if the user is already logged in with the token in localStorage
  if (localStorage.getItem("token")) {
    navigate("/dashboard");
  }

  const handleSignin = async () => {
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        // Save token to localStorage
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <InputBox value={email} onChange={(e) => setEmail(e.target.value)} placeholder="harkirat@gmail.com" label={"Email"} type="email" />
          <InputBox value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" label={"Password"} type="password" />
        </div>
        <div className="pt-4">
          <Button label={loading ? "Signing In..." : "Sign In"} onClick={handleSignin} />
        </div>
        <div className="mt-6 text-center">
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
};
