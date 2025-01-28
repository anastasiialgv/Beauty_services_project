import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Appointment() {
  const availabale = [
    { time: "14:00:00" },
    { time: "15:00:00" },
    { time: "17:00:00" },
  ];
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/getservices")
      .then((response) => {
        setData(response.data);
        if (response.data.length > 0) {
          setService(response.data[0].name);
        }
      })
      .catch((err) => {
        console.error("Error /getservices", err);
        setError("Could not load services. Please try again later.");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(date);
    if (date === "") {
      alert("Please select a date");
    }
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:5000/book",
        { service, date, time },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        alert(response.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error /book", err);
        setError("Could not book the appointment. Please try again later.");
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="card p-4"
          style={{ width: "500px", borderRadius: "15px", borderColor: "black" }}
        >
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <select
              id="service"
              className="form-select mb-4"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {data.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <label htmlFor="date">Select date and time</label>
            <input
              type="date"
              className="form-select mb-4"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <select
              id="time"
              className="form-select mb-4"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            >
              {availabale.map((item, index) => (
                <option key={index} value={item.time}>
                  {item.time}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
