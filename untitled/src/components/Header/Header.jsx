import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function Header({ role }) {
  return (
    <header>
      <nav className="navbar navbar-dark bg-dark ">
        <div className="container d-flex justify-content-between align-items-center ">
          <span className="navbar-brand fw-bold fs-4">Beauty services</span>
          {role === "ADMIN" ? (
            <div>
              <Link
                to="/adminpanel"
                className="nav-link d-inline text-light ms-3"
              >
                Admin Panel
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/" className="nav-link d-inline text-light ">
                Home
              </Link>
              <Link to="/reviews" className="nav-link d-inline text-light ms-3">
                Reviews
              </Link>
              <Link to="/account" className="nav-link d-inline text-light ms-3">
                Account
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
