const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const medicineRoutes = require("./routes/medicineRoutes");
const patientRoutes = require("./routes/patientRoutes");

const app = express();

// ✅ Add CORS here, before routes
const allowedOrigins = [
  "http://localhost:3000",           // for local frontend testing
  "https://med-app-new.vercel.app"   // deployed frontend URL
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req,res) => { res.send("Backend Working"); });

// ✅ Use routes after CORS setup
app.use("/api/medicines", medicineRoutes);
app.use("/api/patients", patientRoutes);

module.exports = app;