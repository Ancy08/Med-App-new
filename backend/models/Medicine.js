const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({

 patientName:String,

 medicineName:String,

 dosage:String,

 taken:{
  type:Boolean,
  default:false
 },
  date: { type: Date, default: new Date() } // Add date field
});

module.exports =
mongoose.model("Medicine",medicineSchema);