import db from "../db.js";
import express from "express";

const router = express.Router();
router.use(express.json());

router.get("/getservices", (req, res) => {
  db.query("SELECT * FROM service", (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    result = result.map((service) => {
      return {
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
        image: service.image
          ? `data:image/png;base64,${service.image.toString("base64")}`
          : null,
      };
    });
    res.json(result);
  });
});
router.post("/addservice", (req, res) => {
  const { name, description, price, image } = req.body;

  if (!name || !description || !price) {
    return res.status(400).send({ error: "Missing required fields" });
  }
  let imageBuffer = null;

  if (image) {
    imageBuffer = Buffer.from(image, "base64");
  }

  const query =
    "INSERT INTO service (name, description, price, image) VALUES (?, ?, ?, ?)";
  db.query(query, [name, description, price, imageBuffer], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ error: "Database error" });
    }
    res.status(201).json({ name, description, price, image });
  });
});

router.put("/updateservice", (req, res) => {
  const { name, description, price, image, key } = req.body;
  console.log("Updated data:", { name, description, price, image });
  console.log("Key:", key);

  let imageBuffer = null;
  if (image) {
    imageBuffer = Buffer.from(image, "base64");
  }

  const query =
    "UPDATE service SET name = ?, description = ?, price = ?, image = ? WHERE name = ?";
  const values = [name, description, price, imageBuffer, key];

  db.query(query, values, (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ error: "Database error" });
    }
    res.status(200).json({
      message: "Service updated successfully",
      updatedService: {
        name,
        description,
        price,
        image: imageBuffer
          ? `data:image/png;base64,${imageBuffer.toString("base64")}`
          : null,
      },
    });
  });
});
router.delete("/deleteservice/:name", (req, res) => {
  const { name } = req.params;
  const query = "DELETE FROM service WHERE name = ?";
  db.query(query, name, (err) => {
    if (err) {
      return res.status(500).send({ error: "Database error" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  });
});
export default router;
