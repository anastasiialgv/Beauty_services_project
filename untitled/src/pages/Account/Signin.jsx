import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [errorAge, setErrorAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      name.trim() === "" ||
      surname.trim() === "" ||
      age.trim() === ""
    ) {
      setError("Fill in all fields");
      return;
    }
    if (age < 18) {
      setErrorAge("You must be at least 18 years old");
      return;
    }
    axios
      .post("http://localhost:5000/register", {
        email,
        name,
        surname,
        age,
        password,
      })
      .then((response) => {
        navigate("/login");
        alert(response.data.message);
      })
      .catch((err) => {
        console.error("Error creating user", err);
      });
  };

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="card p-4 background"
          style={{ width: "500px", borderRadius: "15px", borderColor: "black" }}
        >
          <h3 className="text-center">fill in to complete registration</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label mt-4">
              E-mail address
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: error ? "red" : null }}
            />
            <label htmlFor="name" className="form-label mt-4">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ borderColor: error ? "red" : null }}
            />
            <label htmlFor="surname" className="form-label mt-4">
              Surname
            </label>
            <input
              type="text"
              className="form-control"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              style={{ borderColor: error ? "red" : null }}
            />
            <label htmlFor="age" className="form-label mt-4">
              Age{" "}
              {errorAge && <div className="text-danger mt-2">{errorAge}</div>}
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ borderColor: error ? "red" : null }}
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
              style={{ borderColor: error ? "red" : null }}
            />
            {error && <div className="text-danger mt-2">{error}</div>}
            <button type="submit" className="btn btn-info w-100 mt-4">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
