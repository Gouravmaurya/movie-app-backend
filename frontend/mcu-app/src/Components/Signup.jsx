import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // For navigation in React Router
import axios from "axios";

const Signup = () => {
  const history = useNavigate();  // Replaces useRouter from Next.js
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', user);
      console.log("Signup Success", response.data);
      history('/'); // Navigate to profile page
    } catch (error) {
      console.error("Signup Error", error);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-white">Sign Up</h1>

        <div className="flex gap-4 justify-center items-center">
          <label htmlFor="username" className="text-white">
            Username
          </label>
          <input
            className="text-black"
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />
        </div>

        <div className="flex gap-10 justify-center items-center">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            className="text-black"
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
        </div>

        <div className="flex gap-4 justify-center items-center">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            className="text-black"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
        </div>

        <button
          onClick={onSignup}
          className="px-3 py-1 bg-blue-700 m-4 flex justify-center items-center hover:bg-gray-700 text-white"
        >
          Signup here
        </button>

        {/* Link to Login page */}
        <p className="text-white text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
