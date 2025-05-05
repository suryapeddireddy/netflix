// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Creating AuthContext to manage user authentication
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null); // State to hold current user

  // Fetch current user on app load (after every page refresh)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/users/", { withCredentials: true }); // API to get user info
        setUser(res.data.user); // Assuming backend returns user info
      } catch (err) {
        setUser(null); // In case of error, set user to null
      }
    };
    fetchUser();
  }, []); // Empty dependency array so this runs only once on component mount

  // Signup function (creating new user)
  const signup = async (email, password) => {
    try {
      const res = await axios.post(
        "/api/v1/users/signup", 
        { email, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      setUser(res.data.user); // On successful signup, set the user
    } catch (err) {
      console.error("Signup error: ", err); // Logging any errors
      throw err; // Pass the error back
    }
  };

  // Login function (logging in existing user)
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "/api/v1/users/login", 
        { email, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      setUser(res.data.user); // On successful login, set the user
    } catch (err) {
      console.error("Login error: ", err); // Logging any errors
      throw err; // Pass the error back
    }
  };

  // Logout function (logging out the user)
  const logout = async () => {
    try {
      await axios.post(
        "/api/v1/users/logout", 
        {},
        { withCredentials: true }
      );
      setUser(null); // On logout, clear the user
    } catch (err) {
      console.error("Logout error: ", err); // Logging any errors
      throw err; // Pass the error back
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children} {/* Rendering the children components */}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
