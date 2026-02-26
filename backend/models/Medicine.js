// models/Medicine.ts
import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  medicineName: { type: String, required: true },
  dosage: { type: String, required: true },
  taken: { type: Boolean, default: false },
  date: { type: Date, default: new Date() },
});

// Avoid redefining model in serverless functions
const Medicine = mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);

export default Medicine;