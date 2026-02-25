const express = require("express");
const router = express.Router();
const cors = require("cors");
const Patient = require("@models/patient");

// Enable CORS for frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://med-app-new.vercel.app"
];

router.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Create a new patient
router.post("/", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all patients
router.get("/", async (req, res) => {
  try {
    const data = await Patient.find().populate("caretaker");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;