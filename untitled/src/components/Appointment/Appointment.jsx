import { useState } from "react";
import "./Appointment.css";

export default function Appointment({ service, date, time }) {
  const [isExpanded, setIsExpanded] = useState(false); // Управляет видимостью деталей

  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div>
      Service: {service}
      <button
        className="toggle-button"
        style={{ background: "lightgray" }}
        onClick={toggleDetails}
      >
        <span
          style={{
            display: "inline-block",
            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          ◥
        </span>
      </button>
      {isExpanded && (
        <div style={{ marginTop: "10px" }}>
          <p>Date: {new Date(date).toLocaleDateString()}</p>
          <p>Time: {time.slice(0, 5)}</p>
        </div>
      )}
    </div>
  );
}
