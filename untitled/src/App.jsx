import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Reviews from "./pages/Reviews/Reviews.jsx";
import Login from "./pages/Account/Login.jsx";
import Signin from "./pages/Account/Signin.jsx";
import Appointment from "./pages/Appointment.jsx";
import Success from "./pages/Account/Success.jsx";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route
          path="/reviews"
          element={<Reviews isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
}

export default App;
