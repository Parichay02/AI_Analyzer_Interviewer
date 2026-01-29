import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      // save login state
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect to home
      navigate("/home");

    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl pt-8 font-bold text-yellow-400">
        JOBIFY
      </h1>
      <h1 className="text-center text-xl pt-2 text-red-200">
        Crack Job with AI
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-200 p-6 justify-center mx-auto mt-20 rounded shadow-md w-96"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
