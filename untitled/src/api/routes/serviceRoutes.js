import db from "../db.js";
import express from "express";

const router = express.Router();

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

export default router;
