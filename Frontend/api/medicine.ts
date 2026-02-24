import mongoose from "mongoose";
import Medicine from "../models/Medicine";

// Read env safely
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing! Please set it in Vercel Environment Variables");
}

// Serverless MongoDB connection cache
let conn: Promise<typeof mongoose> | null = null;
const connectMongo = async () => {
  if (conn) return conn;
  conn = mongoose.connect(MONGO_URI).then(() => {
    console.log("MongoDB Connected");
    return mongoose;
  });
  return conn;
};

// Handler function
export default async function handler(req: any, res: any) {
  await connectMongo();

  const { method } = req;

  try {
    if (method === "GET") {
      const meds = await Medicine.find();
      return res.status(200).json(meds);
    }

    if (method === "POST") {
      const med = await Medicine.create(req.body);
      return res.status(201).json(med);
    }

    if (method === "PUT") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "ID is required" });

      const updated = await Medicine.findByIdAndUpdate(id, { taken: true }, { new: true });
      return res.status(200).json(updated);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}