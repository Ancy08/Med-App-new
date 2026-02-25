const express = require("express");
const router = express.Router();
const Caretaker = require("../models/Caretaker");

// ✅ Add CORS headers for Vercel serverless safety
const setCORS = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://med-app-new.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
};

// Add new caretaker
router.post("/", async (req, res) => {
  setCORS(res);
  try {
    const caretaker = await Caretaker.create(req.body);
    res.json(caretaker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all caretakers
router.get("/", async (req, res) => {
  setCORS(res);
  try {
    const data = await Caretaker.find().populate("patients");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;