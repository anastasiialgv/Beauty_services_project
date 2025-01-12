import Header from "../../components/Header/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Email and password cannot be empty");
      return;
    }
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        alert(response.data.message);
        navigate("/");
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center ">
        <div
          className="card p-4 background"
          style={{ width: "500px", borderRadius: "15px", borderColor: "black" }}
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">
              E-mail address
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="form-label mt-4">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="text-danger mt-2">{error}</div>}
            <button type="submit" className="btn btn-info w-100 mt-4">
              Login
            </button>
            <div className="mt-2">
              <span>Don't have an account? </span>
              <Link to="/signin" className="text-info">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
