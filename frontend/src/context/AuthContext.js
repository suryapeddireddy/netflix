// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// ✅ Set base URL once for all requests
axios.defaults.baseURL = "http://localhost:3000"; // Replace with your backend port
axios.defaults.withCredentials = true; // So cookies (sessions) are sent automatically

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/users/");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const signup = async (email, password) => {
    try {
      const res = await axios.post("/api/v1/users/signup", { email, password });
      setUser(res.data.user);
    } catch (err) {
      console.error("Signup error: ", err);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/v1/users/login", { email, password });
      setUser(res.data.user);
    } catch (err) {
      console.error("Login error: ", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/v1/users/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout error: ", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
