import mongoose, { Document, Schema } from "mongoose";

export interface IMedicine extends Document {
  patientName: string;
  medicineName: string;
  dosage: string;
  taken: boolean;
  date: Date;
}

const medicineSchema = new Schema<IMedicine>({
  patientName: { type: String, required: true },
  medicineName: { type: String, required: true },
  dosage: { type: String, required: true },
  taken: { type: Boolean, default: false },
  date: { type: Date, default: new Date() },
});

// Avoid model overwrite in Vercel serverless environment
const Medicine = mongoose.models.Medicine || mongoose.model<IMedicine>("Medicine", medicineSchema);

export default Medicine;