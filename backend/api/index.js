const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors")

const medicineRoutes = require("./routes/medicineRoutes");
const patientRoutes = require("./routes/patientRoutes");
const caretakerRoutes = require("./routes/caretakerRoutes");

const app = express();
const allowedOrigins = ["http://localhost:3000","https://med-app-new.vercel.app"];
app.use(cors({
origin:function(origin, callback){
    if(!origin)return callback(null,true);
    if(allowedOrigins.includes(origin)){
        return callback(null, true);
    }
    else{
        return callback(new Error("Not allowed by CORS"))
    }
}
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

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