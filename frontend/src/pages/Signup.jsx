import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/background_banner.jpg';
import { useAuth } from '../context/AuthContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup(email, password, username);
      console.log("Account created successfully");
      setError("");
      navigate('/signin');
    } catch (err) {
      setError("Failed to create account. Please try again.");
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <img
        src={background}
        alt="background"
        className="hidden sm:block absolute w-full h-full object-cover z-0"
      />
      <div className="absolute w-full h-full bg-black/60 top-0 left-0 z-10"></div>
      <div className="absolute top-4 left-4 z-50">
        <Link to="/">
          <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
            NETFLIX
          </h1>
        </Link>
      </div>
      <div className="fixed w-full px-4 py-24 z-20">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white rounded-md">
          <div className="px-10 py-10">
            <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded bg-gray-700 placeholder-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="p-3 rounded bg-gray-700 placeholder-gray-300 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="p-3 rounded bg-gray-700 placeholder-gray-300 w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </span>
              </div>
              <button
                type="submit"
                className="bg-red-600 py-3 rounded font-semibold hover:bg-red-700 transition duration-300"
              >
                Sign Up
              </button>
              {error && (
                <p className="text-red-600 text-sm mt-2">{error}</p>
              )}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <label>
                  <input type="checkbox" className="mr-1" /> Remember me
                </label>
                <p className="cursor-pointer hover:underline">Need Help?</p>
              </div>
              <p className="pt-6 text-gray-400 text-sm">
                Already subscribed?{' '}
                <Link
                  to="/signin"
                  className="text-white hover:underline cursor-pointer"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;