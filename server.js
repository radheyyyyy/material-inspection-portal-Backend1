import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/admin.routes.js";
import inspectionRoutes from "./routes/inspection.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/inspection", inspectionRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Inspection API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
