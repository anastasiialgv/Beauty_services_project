import db from "../db.js";
import express from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/getappoinments", (req, res) => {
  db.query(
    "SELECT appointment.*, user.name " +
      "FROM appointment JOIN user ON " +
      "user_email = email;",
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(result);
    },
  );
});

router.post("/book", authenticateToken, (req, res) => {
  const { service, date, time } = req.body,
    user_email = req.user.email;
  const query =
    "INSERT INTO appointment (date, time, user_email, service) VALUES (?, ?, ?, ?)";
  db.query(query, [date, time, user_email, service], (err) => {
    if (err) {
      return res.status(500).send({ error: "Database error" });
    }
    res.status(201).send({ message: "Appointment created successfully" });
  });
});
router.delete("/deleteappointment", (req, res) => {
  const id = req.body.id;
  console.log("id" + id);
  const query = "DELETE FROM appointment WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Database error /deleteappointment" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: "Appointment not found" });
    }
    res.status(200).send({ message: "Appointment deleted successfully" });
  });
});
export default router;
