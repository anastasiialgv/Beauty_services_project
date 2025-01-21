import "./UserInfo.css";
import { useState } from "react";
import PropTypes from "prop-types";

const UserInfo = ({ email, name, surname, age, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: email,
    name: name,
    surname: surname,
    age: age,
  });
  const fields = ["email", "name", "surname", "age"];

  const handleSave = async () => {
    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  return (
    <div>
      <h3>Your account</h3>
      {fields.map((field) => (
        <p key={field}>
          <strong>{field}: </strong>
          {isEditing ? (
            <input
              type="text"
              value={formData[field]}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field]: e.target.value }))
              }
            />
          ) : (
            formData[field]
          )}
          <button
            className="buttonupdate"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            <img src="src/assets/update.png" />
          </button>
        </p>
      ))}
      {isEditing && (
        <button className="btn btn-success" onClick={handleSave}>
          Save
        </button>
      )}
    </div>
  );
};
UserInfo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default UserInfo;
