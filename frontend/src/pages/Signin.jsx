import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/background_banner.jpg';
import { useAuth } from '../context/AuthContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { login } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Signin error:', err);
      // Optionally handle specific error responses from the backend
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
              <button
                type="submit"
                className="bg-red-600 py-3 rounded font-semibold hover:bg-red-700 transition duration-300"
              >
                Sign In
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