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
import EventCreationForm from "./components/EventCreationForm";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import { LoadScript } from "@react-google-maps/api";

function App() {
  const API_KEY = import.meta.env.VITE_GMAP_API_KEY;
  return (
    <>
      {/* ToastContainer should be outside Routes to remain mounted always */}
      <LoadScript googleMapsApiKey={API_KEY}>
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
            <Route
              path="eventcreation"
              element={
                <ProtectedRoute>
                  <EventCreationForm />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="events" element={<EventList />} />
            <Route path="events/:id" element={<EventDetails />} />
          </Route>
        </Routes>
      </LoadScript>
    </>
  );
}

export default App;
