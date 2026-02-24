const express = require("express");
const router = express.Router();

const Caretaker = require("../models/Caretaker");

router.post("/", async(req,res)=>{

 const caretaker = await Caretaker.create(req.body);

 res.json(caretaker);

});

router.get("/", async(req,res)=>{

 const data = await Caretaker.find().populate("patients");

 res.json(data);

});

module.exports = router;