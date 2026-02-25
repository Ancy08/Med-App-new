require("module-alias/register"); // MUST be first
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const medicineRoutes = require("@routes/medicineRoutes");
const patientRoutes = require("@routes/patientRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Test routes
app.get("/", (req, res) => res.send("Backend Working"));
app.get("/api", (req, res) => res.json({ message: "API running successfully" }));

// API routes
app.use("/api/medicines", medicineRoutes);
app.use("/api/patients", patientRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;