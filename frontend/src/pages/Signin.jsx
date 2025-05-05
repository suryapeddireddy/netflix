import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/background_banner.jpg';
import { useAuth } from '../context/AuthContext';  // Corrected the hook name

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();  // Corrected to useAuth hook
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      await login(email, password);  // Attempt login
      navigate('/');  // Redirect to home after successful login
    } catch (err) {
      setError('Invalid credentials. Please try again.');  // Show error message on failure
    }
  };

  return (
    <div className="w-full h-screen relative">
      {/* Background image */}
      <img
        src={background}
        alt="background"
        className="hidden sm:block absolute w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute w-full h-full bg-black/60 top-0 left-0 z-10"></div>

      {/* Logo */}
      <div className="absolute top-4 left-4 z-50">
        <Link to="/">
          <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
            NETFLIX
          </h1>
        </Link>
      </div>

      {/* Form */}
      <div className="fixed w-full px-4 py-24 z-20">
        <div className="max-w-[450px] h-[550px] mx-auto bg-black/75 text-white rounded-md">
          <div className="px-10 py-10">
            <h1 className="text-3xl font-bold mb-6">Sign In</h1>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded bg-gray-700 placeholder-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="p-3 rounded bg-gray-700 placeholder-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-red-600 py-3 rounded font-semibold hover:bg-red-700 transition duration-300"
              >
                Sign In
              </button>
              {error && (
                <p className="text-red-600 text-sm mt-2">{error}</p>  // Show error message if any
              )}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <label>
                  <input type="checkbox" className="mr-1" /> Remember me
                </label>
                <p className="cursor-pointer hover:underline">Need Help?</p>
              </div>
              <p className="pt-6 text-gray-400 text-sm">
                New to Netflix?{' '}
                <Link
                  to="/signup"
                  className="text-white hover:underline cursor-pointer"
                >
                  Sign Up now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
