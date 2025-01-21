import { useState } from "react";
import "./Form.css";

export default function Form({ name, description, price, image, handleSub }) {
  const [formData, setFormData] = useState({
    description: description,
    name: name,
    price: price,
    image: image,
  });
  const key = name;
  const handleSave = async (e) => {
    e.preventDefault();
    await handleSub(formData, key);
  };
  return (
    <form onSubmit={handleSave}>
      <textarea
        className="form-control"
        id="reviewText"
        rows="1"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
      ></textarea>
      <textarea
        className="form-control"
        id="reviewText"
        rows="3"
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
      ></textarea>
      <textarea
        className="form-control"
        id="reviewText"
        rows="1"
        value={formData.price}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, price: e.target.value }))
        }
      ></textarea>
      <div className={"mb-2"}>
        Image:
        <img
          src={formData.image}
          className={"img-fluid rounded "}
          style={{ width: "100px" }}
        />
      </div>
      <div className={"mb-2"}>
        <input
          type="file"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
          }
        />
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-info w-100" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
