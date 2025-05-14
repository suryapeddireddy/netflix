// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/users/getuser");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        console.error("Error fetching user on mount:", err);
      }
    };
    fetchUser();
  }, []);

  const signup = async (email, password, username) => { // Expect username as argument
    try {
      const res = await axios.post("/api/v1/users/signup", { email, password, username }); // Send username in request body
      setUser(res.data.user);
    } catch (err) {
      console.error("Signup error: ", err);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/v1/users/signin", { email, password });
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