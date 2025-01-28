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
  handleFileToBase64,
}) {
  const [Editing, setEditing] = useState(false);
  const handleUpdate = async (updated, key) => {
    try {
      let base64Image = updated.image
        ? await handleFileToBase64(updated.image)
        : null;
      if (base64Image) {
        base64Image = base64Image.split(",")[1];
      }
      const formData = {
        ...updated,
        image: base64Image,
        key,
      };

      await axios
        .put("http://localhost:5000/updateservice", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const updatedService = response.data.updatedService;
          setServices((prevServices) =>
            prevServices.map((service) =>
              service.name === key
                ? { ...service, ...updatedService }
                : service,
            ),
          );
        });
    } catch (err) {
      console.error("Error updating service data:", err);
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
