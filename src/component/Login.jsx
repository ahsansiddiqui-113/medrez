import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/login.png";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      const userRole = response.data.user.role; 

      console.log(`User Role is: ${userRole}`);

      if (userRole === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.response ? error.response.data.message : "Server error");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <img src={LoginImage} className="h-screen" alt="Login" />
        </div>
        <div className="p-16">
          <h1 className="text-[#11BE79] font-bold text-3xl py-6">
            MedRez<span className="text-blue-500 font-normal">.net</span>
          </h1>
          <h1 className="text-2xl font-bold py-3">Welcome Back!</h1>
          <p className="text-[#808080]">
            If you have an account, then login; otherwise, first register an
            account and enjoy our services.
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-[80%] gap-2 mb-4 mt-3">
              <label className="font-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                className="border-2 p-2 rounded-md bg-[#F4F4F4] focus:outline-none focus:ring-2 focus:ring-[#11BE79]"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col w-[80%] gap-2">
              <label className="font-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="border-2 p-2 rounded-md bg-[#F4F4F4] focus:outline-none focus:ring-2 focus:ring-[#11BE79]"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-6"> 
              <button
                type="submit"
                className="px-8 py-2 bg-[#11BE79] text-white rounded-md mt-4 hover:bg-[#0FAE6B] transition duration-200"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-[#808080] mt-3 ">
            <p>
              Don't have an account?
              <Link to={"/signup"}>
                {" "}
                <span className="text-[#11BE79]">
                  {" "}
                  <u>Sign Up</u>
                </span>
              </Link>
            </p>
            <p>Create a new account to schedule your medical events!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;



