import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Reviews from "./pages/Reviews/Reviews.jsx";
import Login from "./pages/Account/Login.jsx";
import Signin from "./pages/Account/Signin.jsx";
import Appointment from "./pages/Appontment/Appointment.jsx";
import Account from "./pages/Account/Account.jsx";
import { useState } from "react";
import AdminPanel from "./pages/AdminPanel/AdminPanel.jsx";
import Header from "./components/Header/Header.jsx";
import Loading from "./pages/Loading/Loading.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  return (
    <>
      <Header role={userRole} />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route
          path="/reviews"
          element={<Reviews isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setUserRole={setUserRole}
            />
          }
        />
        <Route
          path={"/account"}
          element={
            isAuthenticated ? (
              <Account />
            ) : (
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUserRole={setUserRole}
              />
            )
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </>
  );
}

export default App;
