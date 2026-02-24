const express = require("express");
const router = express.Router();
const sendMail = require("../../utils/mailer");

const Patient = require("../../models/Patient");

router.post("/", async(req,res)=>{

 try{

 const patient = await Patient.create(req.body);

 res.json(patient);

 }

 catch(err){

 res.status(400).json({error:err.message});

 }

});

router.get("/", async(req,res)=>{

 const data = await Patient.find().populate("caretaker");

 res.json(data);

});

module.exports = router;