// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // Fetch current user on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user", { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Signup
  const signup = async (email, password) => {
    try {
      const res = await axios.post("/api/signup", { email, password }, { withCredentials: true });
      setUser(res.data.user); // Assuming backend returns created user
    } catch (err) {
      throw err;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/login", { email, password }, { withCredentials: true });
      setUser(res.data.user);
    } catch (err) {
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
