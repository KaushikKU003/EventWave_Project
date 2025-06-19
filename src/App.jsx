// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/Dashboard";
import ResponsiveNavbar from "./components/ResponsiveNavbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResponsiveNavbar />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
