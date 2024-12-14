import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission for signup
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Make API call for signup
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password,
      });

      // Check the structure of the response to ensure the user data exists
      console.log(response.data); // Log the response to check

      // Save the token and username to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      // If the response contains user data with _id
      if (response.data.user) {
        localStorage.setItem("userId", response.data.user._id);
      } else {
        console.error("User data is missing from the response.");
      }

      // Redirect to the dashboard immediately after signup
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <div className="space-y-4">
          <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
          <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
          <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="harkirat@gmail.com" label={"Email"} />
          <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="123456" label={"Password"} type="password" />
        </div>
        <div className="pt-4">
          <Button onClick={handleSubmit} label={isLoading ? "Signing up..." : "Sign up"} />
        </div>
        <div className="mt-6 text-center">
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};
