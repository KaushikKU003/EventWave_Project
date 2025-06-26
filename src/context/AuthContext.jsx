import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // "User" or "Organizer"
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookies.user && cookies.token) {
      setIsLoggedIn(true);
      setRole(cookies.user.role);
      setUserName(cookies.user.fullName);
      setToken(cookies.token);
    }
    setLoading(false);
  }, [cookies]);

  // Login method (used in Login.jsx)
  const login = ({ fullName, role, token }) => {
    setIsLoggedIn(true);
    setRole(role);
    setUserName(fullName);
    setToken(token);

    // Save to cookies
    setCookie("user", { fullName, role }, { path: "/", maxAge: 86400 }); // 1 day
    setCookie("token", token, { path: "/", maxAge: 86400 }); // 1 day
  };

  // Logout method (can be used in Navbar)
  const logout = () => {
    setIsLoggedIn(false);
    setRole("");
    setUserName("");
    setToken("");

    removeCookie("user");
    removeCookie("token");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, userName, token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
