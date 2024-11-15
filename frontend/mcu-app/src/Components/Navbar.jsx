import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("John Doe"); // Replace with actual data
  const navigate = useNavigate(); // Initialize useNavigate

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Check if the token is stored
    if (token) {
      setIsLoggedIn(true);
      // You can parse the token to get the username if it's a JWT
      // Example: setUserName(decodedToken.name);
    }
  }, [isLoggedIn]); // Add isLoggedIn as a dependency

  // Login/logout logic
  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Log out: Remove token from localStorage and set state to logged out
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      navigate("/login"); // Optionally navigate to login page after logout
    } else {
      // Navigate to login page for logging in
      navigate("/login");
    }
  };

  return (
    <nav className=" absolute z-50 w-screen flex justify-between items-center p-4 bg-transparent text-white">
      {/* First part - Marvel text */}
      <div className="text-3xl font-bold flex items-center">
    <span className="text-red-600">Marvel</span>
    <span className="text-gray-300"> Universe</span>
  </div>

      {/* Second part - Login button or Username */}
      
    </nav>
  );
};

export default Navbar;
