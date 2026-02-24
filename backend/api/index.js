const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const medicineRoutes = require("../routes/medicineRoutes");
const patientRoutes = require("../routes/patientRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err));

app.get("/",(req,res)=>{
 res.send("Backend Working");
});

app.get("/api",(req,res)=>{
 res.json({message:"API running successfully"});
});

// Routes
app.use("/api/medicines",medicineRoutes);
app.use("/api/patients",patientRoutes);

// ⭐ VERY IMPORTANT
module.exports = app;