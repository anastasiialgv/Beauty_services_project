import { useNavigate } from "react-router-dom";

export default function Block(props) {
  const navigate = useNavigate();
  return (
    <div
      className={`row align-items-center mb-4  ${
        props.reverse ? "flex-row-reverse" : ""
      }`}
    >
      <div className="col-6 text-center px-3">
        <img src={props.img} className={"img-fluid rounded "} alt="zdjecie" />
      </div>
      <div className="col-6 px-3">
        <p className="text-bg-black fs-3">{props.name}</p>
        <p className="text-secondary fs-4">{props.price}</p>
        <p className="text-secondary fs-4">{props.text}</p>
        <button
          className="btn btn-dark mt-3 w-100"
          onClick={() => navigate("/")}
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
}
