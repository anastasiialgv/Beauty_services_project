import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
const SECRET_KEY = "glostie";

router.post("/register", (req, res) => {
  const { email, name, surname, age, password } = req.body;

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
      console.log(user.email, user.id);
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );
      res.status(200).send({ message: "Login successful", token });
    });
  });
});

export default router;
