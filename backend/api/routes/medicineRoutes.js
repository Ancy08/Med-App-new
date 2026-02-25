const express = require("express");
const router = express.Router();
const Medicine = require("../../models/medicine");

const setCORS = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://med-app-new.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
};

// Add new medicine
router.post("/", async (req, res) => {
  setCORS(res);
  try {
    const med = await Medicine.create(req.body);
    res.json(med);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all medicines
router.get("/", async (req, res) => {
  setCORS(res);
  try {
    const meds = await Medicine.find();
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update tablet taken
router.put("/:id", async (req, res) => {
  setCORS(res);
  try {
    const update = await Medicine.findByIdAndUpdate(
      req.params.id,
      { taken: true },
      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;