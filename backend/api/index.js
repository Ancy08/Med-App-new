const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();

/* ------------------ CORS ------------------ */
const allowedOrigins = [
  "http://localhost:3000",
  "https://med-app-new.vercel.app",
];

app.use(cors());

/* ------------------ Middleware ------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ------------------ MongoDB ------------------ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log(err));

/* ================== MODELS ================== */

const medicineSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  medicineName: { type: String, required: true },
  dosage: { type: String, required: true },
  taken: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const caretakerSchema = new mongoose.Schema({
  name: String,
  contact: String,
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
});

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  illness: String,
  caretaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Caretaker",
  },
});

const Medicine =
  mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);
const Caretaker =
  mongoose.models.Caretaker || mongoose.model("Caretaker", caretakerSchema);
const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

/* ================== ROUTES ================== */

/* ---- Medicine Routes ---- */

app.post("/medicines", async (req, res) => {
  try {
    const med = await Medicine.create(req.body);
    res.json(med);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/medicines", async (req, res) => {
  try {
    const meds = await Medicine.find();
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/medicines/:id", async (req, res) => {
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

/* ---- Patient Routes ---- */

app.post("/patients", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/patients", async (req, res) => {
  try {
    const data = await Patient.find().populate("caretaker");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---- Caretaker Routes ---- */

app.post("/caretakers", async (req, res) => {
  try {
    const caretaker = await Caretaker.create(req.body);
    res.json(caretaker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/caretakers", async (req, res) => {
  try {
    const data = await Caretaker.find().populate("patients");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ Root ------------------ */
app.get("/", (req, res) => {
  res.send("Backend Running");
});

module.exports = app;