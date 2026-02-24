const mongoose = require("mongoose");

const caretakerSchema = new mongoose.Schema({

 name:String,
 contact:String,
 patients:[{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Patient"
 }]

});

module.exports = mongoose.model("Caretaker", caretakerSchema);