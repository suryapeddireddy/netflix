import React from 'react';

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 absolute top-0 left-0 w-full z-[100] bg-gradient-to-b from-black/80 to-transparent">
      {/* Logo */}
      <h1 className="text-red-600 text-4xl font-extrabold tracking-wide cursor-pointer">
        NETFLIX
      </h1>

      {/* Auth Buttons */}
      <div className="space-x-4">
        <button className="py-2 px-5 rounded font-medium text-white hover:text-red-600 transition">
          Sign In
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded font-medium transition">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
