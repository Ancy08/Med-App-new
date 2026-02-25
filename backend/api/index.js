const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const medicineRoutes = require("./routes/medicineRoutes");
const patientRoutes = require("./routes/patientRoutes");
const caretakerRoutes = require("./routes/caretakerRoutes");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Mongo Connected"))
.catch(err => console.log(err));

app.use("/api/medicines", medicineRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/caretakers", caretakerRoutes);

app.get("/", (req,res)=>{
 res.send("Backend Running");
});

module.exports = app;