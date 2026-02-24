const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({

 name:String,
 age:Number,
 illness:String,
 caretaker:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Caretaker"
 }

});

module.exports = mongoose.model("Patient", patientSchema);