const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const medicineRoutes = require("./routes/medicineRoutes");
const patientRoutes = require("./routes/patientRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// API test route
app.get("/api", (req, res) => {
  res.json({ message: "API running successfully" });
});

// Routes
app.use("/api/medicines", medicineRoutes);
app.use("/api/patients", patientRoutes);

// 🚀 Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});