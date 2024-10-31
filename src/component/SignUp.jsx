import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SignupImage from "../assets/signup.png";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role
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
        "http://localhost:5000/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User signed up:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      // Enhanced error handling
      setError(error.response ? error.response.data.message : "Server error");
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div>
        <img src={SignupImage} className="h-screen" alt="Signup" />
      </div>
      <div className="py-8 px-16">
        <h1 className="text-[#11BE79] font-bold text-3xl py-6">
          MedRez<span className="text-blue-500 font-normal">.net</span>
        </h1>
        <h1 className="text-2xl font-bold py-3">Create new Account!</h1>
        <p className="text-[#808080]">
          If you have an account, then login; otherwise, first register an
          account and enjoy our services.
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-[80%] gap-2 mb-4 mt-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="border-2 p-2 rounded-md bg-[#F4F4F4]"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col w-[80%] gap-2 mb-4 mt-3">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="border-2 p-2 rounded-md bg-[#F4F4F4]"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col w-[80%] gap-2">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="border-2 p-2 rounded-md bg-[#F4F4F4]"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col w-[80%] gap-2 mb-4 mt-3">
            <label>Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border-2 p-2 rounded-md bg-[#F4F4F4]"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-8 py-2 bg-[#11BE79] text-white rounded-md mt-4"
          >
            Create Account
          </button>
        </form>
        <div className="text-[#808080] mt-3">
          <p>
            First time here?{" "}
            <Link to={"/"}>
              <span className="text-[#11BE79]">
                {" "}
                <u>Login Here</u>
              </span>
            </Link>
          </p>
          <p>Create a new account to schedule your medical events!</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
