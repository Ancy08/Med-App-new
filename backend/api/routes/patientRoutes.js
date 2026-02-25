const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

const setCORS = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://med-app-new.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
};

// Create new patient
router.post("/", async (req, res) => {
  setCORS(res);
  try {
    const patient = await Patient.create(req.body);
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all patients
router.get("/", async (req, res) => {
  setCORS(res);
  try {
    const data = await Patient.find().populate("caretaker");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;