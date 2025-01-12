import Header from "../../components/Header/Header.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Appointment from "../../components/Appointment/Appointment.jsx";

export default function Account() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.error("Error /getuser", err);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="card border-black w-50 mx-auto ">
        <div className="card-body background">
          <div className="d-flex justify-content-evenly">
            <div className="me-5">
              <h3>Your account</h3>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Name:</strong> {data.name}
              </p>
              <p>
                <strong>Surname:</strong> {data.surname}
              </p>
              <p>
                <strong>Age:</strong> {data.age}
              </p>
            </div>
            <div className="ms-3">
              <h3>Your appointments</h3>
              {data.appointments && data.appointments.length > 0 ? (
                data.appointments.map((appointment) => {
                  return (
                    <Appointment
                      key={appointment.order_id}
                      service={appointment.service}
                      date={appointment.date}
                      time={appointment.time}
                    />
                  );
                })
              ) : (
                <p>You don't have any appointments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
