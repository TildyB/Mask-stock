const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');

const Partner = require("../models/partner")

router.get("/:id", async (req,res) => {
    const foundPartner = await Partner.find({ id: parseInt(req.params.id) })
    res.json(foundPartner)
})

router.get("/", async(req,res) => {
    const everyHospital = await Partner.find({})
    res.send(everyHospital)
})


module.exports = router