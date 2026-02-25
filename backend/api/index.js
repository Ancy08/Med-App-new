const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const caretakerRoutes = require("./api/routes/caretakerRoutes");
const medicineRoutes = require("./api/routes/medicineRoutes");
const patientRoutes = require("./api/routes/patientRoutes");

const app = express();

// ✅ Global CORS
const allowedOrigins = [
  "http://localhost:3000",           // local frontend
  "https://med-app-new.vercel.app"   // deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Test route
app.get("/", (req, res) => res.send("Backend Working"));

// ✅ Routes
app.use("/api/caretakers", caretakerRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/patients", patientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;