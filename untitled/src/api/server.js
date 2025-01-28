import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(reviewRoutes);
app.use(userRoutes);
app.use(serviceRoutes);
app.use(appointmentRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
