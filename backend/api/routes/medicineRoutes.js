const express = require("express");
const router = express.Router();

const Medicine =
require("../../models/Medicine");


// ADD MEDICINE

router.post("/", async(req,res)=>{

 const med =
 await Medicine.create(req.body);

 res.json(med);

});


// GET ALL MEDICINES

router.get("/", async(req,res)=>{

 const meds =
 await Medicine.find();

 res.json(meds);

});


// TABLET TAKEN UPDATE

router.put("/:id",async(req,res)=>{

 const update =
 await Medicine.findByIdAndUpdate(

 req.params.id,

 {taken:true},

 {new:true}

 );

 res.json(update);

});

module.exports = router;