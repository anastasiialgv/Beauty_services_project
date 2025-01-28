import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    age: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) newErrors[key] = "This field is required";
    });

    if (formData.age && formData.age < 18) {
      newErrors.age = "You must be at least 18 years old";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one special character.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    axios
      .post("http://localhost:5000/register", formData)
      .then((response) => {
        navigate("/login");
        alert(response.data.message);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setErrors({ server: err.response.data.error });
        } else {
          console.error("Error creating user", err);
          setErrors({ server: "Registration failed. Please try again later." });
        }
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="card p-4 background"
          style={{ width: "500px", borderRadius: "15px", borderColor: "black" }}
        >
          <h3 className="text-center">fill in to complete registration</h3>
          {errors.server && (
            <div className="alert alert-danger">{errors.server}</div>
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label mt-4">
              E-mail address
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <label htmlFor="name" className="form-label mt-4">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
            <label htmlFor="surname" className="form-label mt-4">
              Surname
            </label>
            <input
              type="text"
              className={`form-control ${errors.surname ? "is-invalid" : ""}`}
              id="surname"
              value={formData.surname}
              onChange={handleChange}
            />
            {errors.surname && (
              <div className="invalid-feedback">{errors.surname}</div>
            )}
            <label htmlFor="age" className="form-label mt-4">
              Age
            </label>
            <input
              type="number"
              className={`form-control ${errors.age ? "is-invalid" : ""}`}
              id="age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
            <label htmlFor="password" className="form-label mt-4">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
            <button type="submit" className="btn btn-info w-100 mt-4">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
