import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";
import Service from "../../components/Service/Service.jsx";
import Form from "../../components/Form/Form.jsx";

export default function AdminPanel() {
  const [services, setServices] = useState([]);
  const [Vappontments, setVappontments] = useState([]);
  const [Vservices, setVservices] = useState([]);
  const toogleState = (state) => {
    state((prev) => !prev);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getappoinments")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error("Error /getappointments", err);
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
      });
  }, []);
  const handleSub = async (addedData) => {
    try {
      console.log("Submitting data:", addedData);
      await axios
        .post("http://localhost:5000/addservice", addedData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          const newService = response.data;
          setServices((prevServices) => [...prevServices, newService]);
        });
    } catch (err) {
      console.error("Error updating user data:", err);
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
    }
  };
  return (
    <div className="card border-black w-50 mx-auto ">
      <div className="card-body background">
        <div style={{ textAlign: "center" }}>
          <h1>Manage your site here</h1>
        </div>

        <p>
          <strong>Look at all appointments</strong>
          <button
            className="toggle-button"
            style={{ background: "lightgray" }}
            onClick={() => toogleState(setVappontments)}
          >
            <span
              style={{
                display: "inline-block",
                transform: Vappontments ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            >
              ◥
            </span>
          </button>
        </p>
        {Vappontments &&
          data.map((item) => (
            <table key={item.id} className="table table-bordered custom-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {item.service} <br />
                  </td>
                  <td>{item.name}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.time.slice(0, 5)}</td>
                </tr>
              </tbody>
            </table>
          ))}
        <p>
          <strong>Edit your services:</strong>
          <button
            className="toggle-button"
            style={{ background: "lightgray" }}
            onClick={() => toogleState(setVservices)}
          >
            <span
              style={{
                display: "inline-block",
                transform: Vservices ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            >
              ◥
            </span>
          </button>
        </p>
        {Vservices && (
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
  );
}
