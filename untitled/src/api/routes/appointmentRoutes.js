import db from "../db.js";
import express from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/getappoinments", (req, res) => {
  db.query("SELECT * FROM appointment", (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(result);
  });
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

export default router;
