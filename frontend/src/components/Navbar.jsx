import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    // Redirect to account page
    navigate("/account");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Redirect to home after logging out using navigate
    } catch (err) {
      console.error("Logout error", err);
      // Optionally display an error message to the user
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 absolute top-0 left-0 w-full z-[100] bg-gradient-to-b from-black/80 to-transparent">
      {/* Logo */}
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-extrabold tracking-wide cursor-pointer">
          NETFLIX
        </h1>
      </Link>

      {/* Auth Buttons or User Avatar */}
      <div className="space-x-4 flex items-center">
        {!user ? (
          <>
            <Link to="signin">
              <button className="py-2 px-5 rounded font-medium text-white hover:text-red-600 transition">
                Sign In
              </button>
            </Link>
            <Link to="signup">
              <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded font-medium transition">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            {/* Avatar */}
            <div
              onClick={handleAvatarClick}
              className="cursor-pointer rounded-full w-8 h-8 bg-gray-300 flex items-center justify-center text-sm text-black hover:bg-gray-400 transition"
            >
              😊 {/* Replace with user's avatar or initials if available */}
            </div>
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="py-2 px-5 rounded font-medium text-white bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;