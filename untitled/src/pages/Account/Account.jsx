import { useEffect, useState } from "react";
import axios from "axios";
import Appointment from "../../components/Appointment/Appointment.jsx";
import UserInfo from "../../components/UserInfo/UserInfo.jsx";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Account() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setData(response.data);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Error /getuser", err);
      });
  }, []);
  const handleUpdate = async (updatedData) => {
    try {
      await axios.post("http://localhost:5000/updateuser", updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setData((prevData) => ({
        ...prevData,
        ...updatedData,
      }));
    } catch (err) {
      console.error("Error updating user data:", err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/deleteuser", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };
  const handleDeleteAppointment = async (id) => {
    try {
      console.log(id);
      await axios.delete("http://localhost:5000/deleteappointment", {
        data: { id },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setData((prevData) => ({
        ...prevData,
        appointments: prevData.appointments.filter(
          (appointment) => appointment.id !== id,
        ),
      }));
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleConfirmDelete = () => {
    handleDelete();
    handleCloseModal();
  };
  return (
    <div>
      <div className="card border-black w-50 mx-auto ">
        <div className="card-body background">
          <div className="d-flex justify-content-evenly">
            <div className="me-5">
              <UserInfo
                email={data.email}
                name={data.name}
                surname={data.surname}
                age={data.age}
                onUpdate={handleUpdate}
              />
            </div>
            <div className="ms-3">
              <h3>Your appointments</h3>
              {data.appointments && data.appointments.length > 0 ? (
                data.appointments.map((appointment) => {
                  return (
                    <Appointment
                      key={appointment.id}
                      service={appointment.service}
                      date={appointment.date}
                      time={appointment.time}
                      onDelete={() => handleDeleteAppointment(appointment.id)}
                    />
                  );
                })
              ) : (
                <p>You don't have any appointments yet.</p>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-evenly">
            <button className="btn btn-danger" onClick={handleShowModal}>
              Delete my account
            </button>
          </div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete your account?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                className="w-100"
                onClick={handleConfirmDelete}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
