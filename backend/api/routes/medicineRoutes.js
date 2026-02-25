const express = require("express");
const router = express.Router();
const Medicine = require("@models/medicine");

// ADD MEDICINE
router.post("/", async (req, res) => {
  try {
    const med = await Medicine.create(req.body);
    res.json(med);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL MEDICINES
router.get("/", async (req, res) => {
  try {
    const meds = await Medicine.find();
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TABLET TAKEN UPDATE
router.put("/:id", async (req, res) => {
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