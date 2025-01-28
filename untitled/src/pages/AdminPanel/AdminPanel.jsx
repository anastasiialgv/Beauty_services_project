import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";
import Service from "../../components/Service/Service.jsx";
import Form from "../../components/Form/Form.jsx";

export default function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [showAppointments, setShowAppointments] = useState([]);
  const [showServices, setShowServices] = useState([]);
  const [error, setError] = useState("");
  const toogleState = (state) => {
    state((prev) => !prev);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/getappoinments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((err) => {
        console.error("Error /getappointments", err);
        setError("Failed to fetch appointments. Please try again.");
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getservices")
      .then((response) => {
        setServices(response.data);
      })
      .catch((err) => {
        console.error("Error /getservices", err);
        setError("Failed to fetch services. Please try again.");
      });
  }, []);
  const handleSub = async (addedData) => {
    try {
      await axios
        .post("http://localhost:5000/addservice", addedData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          const newService = response.data;
          setServices((prevServices) => [...prevServices, newService]);
        });
    } catch (err) {
      console.error("Error adding service:", err);
      setError("Failed to add service. Please try again.");
    }
  };
  const onDelete = async (name) => {
    try {
      await axios.delete(`http://localhost:5000/deleteservice/${name}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setServices((prevServices) =>
        prevServices.filter((service) => service.name !== name),
      );
    } catch (err) {
      console.error("Error deleting service:", err);
      setError("Failed to delete service. Please try again.");
    }
  };
  return (
    <div className="card border-black w-50 mx-auto ">
      <div className="card-body background">
        <div style={{ textAlign: "center" }}>
          <h1>Manage your site here</h1>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
        <div className="mb-4">
          <strong>Look at all appointments</strong>
          <button
            className="toggle-button"
            style={{ background: "lightgray" }}
            onClick={() => toogleState(setShowAppointments)}
          >
            <span
              style={{
                display: "inline-block",
                transform: showAppointments ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            >
              ◥
            </span>
          </button>
          {showAppointments && (
            <table className="table table-bordered custom-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.service}</td>
                    <td>{item.name}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{item.time.slice(0, 5)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>
          <strong>Edit your services:</strong>
          <button
            className="toggle-button"
            style={{ background: "lightgray" }}
            onClick={() => toogleState(setShowServices)}
          >
            <span
              style={{
                display: "inline-block",
                transform: showServices ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            >
              ◥
            </span>
          </button>
          {showServices && (
            <div>
              {services.length > 0 &&
                services.map((service) => (
                  <div
                    key={service.id}
                    className="card border-black w-100 mx-auto mb-3"
                  >
                    <Service
                      name={service.name}
                      description={service.description}
                      image={service.image}
                      price={service.price}
                      setServices={setServices}
                      onDelete={() => onDelete(service.name)}
                    />
                  </div>
                ))}
              <Form
                name={""}
                description={""}
                price={""}
                image={""}
                handleSub={handleSub}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
