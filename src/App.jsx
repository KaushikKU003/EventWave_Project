import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ResponsiveNavbar from "./components/ResponsiveNavbar";
import ProtectedRoute from "./utils/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <>
    {/* ToastContainer should be outside Routes to remain mounted always */}
      <ToastContainer />
    <Routes>
      <Route path="/" element={<ResponsiveNavbar />}>
        <Route index element={<Home />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
