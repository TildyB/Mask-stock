const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');

const User = require("../models/user")
const Partner = require("../models/partner")

router.get("/:name", async (req,res) => {
    const foundUser = await User.find({ name: req.params.name})
    const hospitalId =foundUser[0].access

    const foundPartners = await Partner.find({ id: hospitalId })   
    res.json(foundPartners)
})

router.post("/newHospital/:name",async (req,res)=>{
    const newHospital = req.body
    const newId =newHospital[0].id
    res.send("success")
    User.findOneAndUpdate(
        { name: req.params.name }, 
        { $push: { access: newId  } },
        function ( error,success){
            if(error){
                console.log(error);
            }else{
                console.log(success);
            }
        }
    )
})


router.get("/", async (req, res) => {
    const foundUsers = await User.find({})
    res.json(foundUsers)
})

module.exports = router