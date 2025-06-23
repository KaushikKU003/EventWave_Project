import { createContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // "User" or "Organizer"
  const [userName, setUserName] = useState("");

  // Load from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setRole(user.role);
      setUserName(user.name);
    }
  }, []);

  // Login method (used in Login.jsx)
  const login = (user) => {
    setIsLoggedIn(true);
    setRole(user.role);
    setUserName(user.name);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Logout method (can be used in Navbar)
  const logout = () => {
    setIsLoggedIn(false);
    setRole("");
    setUserName("");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
