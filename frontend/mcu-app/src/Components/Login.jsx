import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

const LoginPage = () => {
  const history = useNavigate();  
  const [user, setUser] = useState({
    email: '',
    password: '',
  });


    const onLogin = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', user);
        console.log("Signup Success", response.data);
        history('/'); // Navigate to profile page
      } catch (error) {
        console.error("Login Error", error);
      }
    };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-white">Login</h1>

        <div className="flex gap-10 justify-center items-center">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
          <input
            className="text-black"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
        </div>

        <button onClick={onLogin} className="px-3 py-1 bg-blue-700 m-4 flex justify-center items-center hover:bg-gray-700">
          Login here
        </button>
        <Link to="/signup" className="text-white">New Account? Signup</Link> {/* Changed Link to react-router's Link */}
      </div>
    </div>
  );
};

export default LoginPage;
