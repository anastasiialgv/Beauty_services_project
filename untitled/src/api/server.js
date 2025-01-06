import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(reviewRoutes);
app.use(userRoutes);
app.use(serviceRoutes);
app.use(appointmentRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
