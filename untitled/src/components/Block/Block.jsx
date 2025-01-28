import { useNavigate } from "react-router-dom";

export default function Block({
  id,
  name,
  price,
  description,
  image,
  isAuthenticated,
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`row align-items-center mb-4  ${
        id % 2 == 0 ? "flex-row-reverse" : ""
      }`}
    >
      <div className="col-6 text-center px-3">
        {image && (
          <img src={image} className={"img-fluid rounded "} alt={name} />
        )}
      </div>
      <div className="col-6 px-3">
        <p className="text-bg-black fs-3">{name}</p>
        <p className="text-secondary fs-4">{price}</p>
        <p className="text-secondary fs-4">{description}</p>
        <button
          className="btn btn-dark mt-3 w-100"
          onClick={() => {
            isAuthenticated ? navigate("/appointment") : navigate("/login");
          }}
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
}
