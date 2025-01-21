import Form from "../Form/Form.jsx";
import { useState } from "react";
import axios from "axios";

export default function Service({
  name,
  description,
  price,
  image,
  onDelete,
  setServices,
}) {
  const [Editing, setEditing] = useState(false);
  const handleUpdate = async (updated, key) => {
    try {
      const formData = new FormData();
      formData.append("name", updated.name);
      formData.append("description", updated.description);
      formData.append("price", updated.price);
      formData.append("image", updated.image);
      formData.append("key", key);

      console.log("Updated data:", formData);
      await axios
        .put("http://localhost:5000/updateservice", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const updatedService = response.data;
          setServices((prevServices) =>
            prevServices.map((service) =>
              service.name === key
                ? { ...service, ...updatedService }
                : service,
            ),
          );
        });
    } catch (err) {
      console.error("Error updating user data:", err);
    }
  };
  return (
    <div className="card-body">
      <div className="d-flex justify-content-between">
        <button
          className="buttonupdate"
          onClick={() => setEditing((prev) => !prev)}
        >
          <img src="src/assets/update.png" />
        </button>
        <h5>{!Editing && name}</h5>

        <button onClick={onDelete} className="buttonupdate ms-5">
          <img src="src/assets/delete.png" />
        </button>
      </div>
      {Editing && (
        <Form
          name={name}
          description={description}
          price={price}
          image={image}
          handleSub={handleUpdate}
        />
      )}
    </div>
  );
}
