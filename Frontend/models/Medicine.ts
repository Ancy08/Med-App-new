import mongoose, { Document, Schema } from "mongoose";

export interface IMedicine extends Document {
  patientName: string;
  medicineName: string;
  dosage: string;
  taken: boolean;
}

const medicineSchema = new Schema<IMedicine>({
  patientName: { type: String, required: true },
  medicineName: { type: String, required: true },
  dosage: { type: String, required: true },
  taken: { type: Boolean, default: false }
});

// Avoid model overwrite in Vercel serverless environment
export default mongoose.models.Medicine || mongoose.model<IMedicine>("Medicine", medicineSchema);