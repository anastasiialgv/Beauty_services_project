import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import db from "../db.js";

const router = express.Router();

router.get("/getreviews", (req, res) => {
  db.query("SELECT * FROM review", (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(result);
  });
});
//authenticateToken
router.post("/createreview", authenticateToken, (req, res) => {
  const { text, rating, date } = req.body;
  const user_email = req.user.email;

  if (!req.user || !req.user.email) {
    res.status(401).send("Unauthorized: No email in token");
    return;
  }
  const query =
    "INSERT INTO review (text, rating, date, user_email) VALUES (?, ?, ?, ?)";
  db.query(query, [text, rating, date, user_email], (err) => {
    if (err) {
      return res.status(500).send({ error: "Database error" });
    }
    res.status(201).send("Review created successfully");
  });
});

export default router;
