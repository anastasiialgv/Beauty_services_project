import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();
const SECRET_KEY = "glostie";

router.post("/register", (req, res) => {
  const { email, name, surname, age, password } = req.body;
  const checkEmailQuery = "SELECT email FROM user WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Database error" });
    }

    if (results.length > 0) {
      return res.status(400).send({ error: "Email already exists" });
    }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send({ error: "Internal server error" });
    }

    const query =
      "INSERT INTO user (email, name, surname, age, password) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [email, name, surname, age, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).send({ error: "Email already exists" });
          }
          return res.status(500).send({ error: "Database error" });
        }
        res.status(201).send({
          message: "User registered successfully",
          userId: result.insertId,
        });
      },
    );
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM user WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).send({ error: "User not found" });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isValid) => {
      if (err || !isValid) {
        return res.status(401).send({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );
      res.send({ token, role: user.role });
    });
  });
});

router.get("/getuser", authenticateToken, (req, res) => {
  const email = req.user.email;
  const query =
    "SELECT u.email, u.name, u.surname, u.age, " +
    "o.id, o.service, o.date, o.time " +
    "FROM user u LEFT JOIN appointment o ON " +
    "u.email = o.user_email WHERE u.email = ?;";

  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Database error /getuser" });
    }
    if (results.length === 0) {
      return res.status(404).send({ error: "User not found" });
    }
    const user = {
      email: results[0].email,
      name: results[0].name,
      surname: results[0].surname,
      age: results[0].age,
      appointments: results
        .filter((row) => row.id)
        .map((row) => ({
          id: row.id,
          service: row.service,
          date: row.date,
          time: row.time,
        })),
    };

    res.json(user);
  });
});
router.post("/updateuser", authenticateToken, (req, res) => {
  const { email, name, surname, age } = req.body;
  const query =
    "UPDATE user SET name = ?, surname = ?, age = ? WHERE email = ?";
  db.query(query, [name, surname, age, email], (err, result) => {
    if (err) {
      return res.status(500).send({ error: "Database error /updateuser" });
    }
    res.status(200).send({ message: "User updated successfully" });
  });
});
router.delete("/deleteuser", authenticateToken, (req, res) => {
  const email = req.user.email;
  const query = "DELETE FROM user WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).send({ error: "Database error /deleteuser" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  });
});
export default router;
