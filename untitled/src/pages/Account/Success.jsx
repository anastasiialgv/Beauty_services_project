import Header from "../../components/Header/Header.jsx";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="container p-4"
          style={{ width: "500px", marginTop: "100px" }}
        >
          <h2>Thank you! Registration completed successfully.</h2>
          <Link to={"/"} className="btn btn-light mt-4 w-75">
            Go back to the homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
