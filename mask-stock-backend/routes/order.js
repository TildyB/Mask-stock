const express = require('express')
const router = express.Router()
const axios = require("axios")

const mongoose = require('mongoose')

const Mask = require('../models/mask')
const Order = require('../models/order')

router.post("/", async (req,res) => {
   const amount = req.body.amount
   console.log(req.body)
   const date = new Date();
   
  let day = `${date.getDate()}`.padStart(2, "0");
  let month = `${date.getMonth() + 1}`.padStart(2, "0");
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;
  console.log(typeof currentDate)

    const orderData ={
        partner_id: req.body.id,
        block_id: 0,
        type: "invoice",
        fulfillment_date: currentDate,
        due_date: currentDate,
        payment_method: "bankcard",
        language: "hu",
        currency:"HUF" ,
        conversion_rate: 1,
        items: [
            {
              product_id: req.body.address==="HU"? 12854470 : 12888348,
              quantity: amount,
              comment: "string"
            }]   
    }
    const maskAmount = await Mask.find({})

    const newAmount = maskAmount[0].amount-orderData.items[0].quantity;
    
    if(newAmount>0){
        await Mask.findOneAndUpdate({name:"Mask"},{amount:newAmount})
        const sendRecipeData = await axios.post("https://api.billingo.hu/v3/documents" , 
        orderData
      ,{
            headers: {
                // 'Content-Type': 'application/json',
                'X-API-KEY': 'c4367eda-abb6-11ed-b362-0adb4fd9a356'
            }
        })      
        res.status(201).send("Sikeres rendelés") 
        const newOrder = new Order(orderData)
        newOrder.save(function (err) {
          if (err) {
              console.log(err)
          } else {
              console.log('saved')
          }
      })     
    }else{
        res.status(400).send(maskAmount)
    }
})

router.get("/all/:id", async (req, res) => {

  const config = {
    method: 'get',
    url: `https://api.billingo.hu/v3/documents?page=1&per_page=25&partner_id=${req.params.id}`,
    headers: { 
      'X-API-KEY': 'c4367eda-abb6-11ed-b362-0adb4fd9a356'
    }
  };
  
  axios(config)
  .then(function (response) {
    // console.log(response.data);
    res.send(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });

  
  
})

router.get("/url/:id",async(req,res)=>{
  const config = {
    method: 'get',
    url: `https://api.billingo.hu/v3/documents/${req.params.id}/public-url`,
    headers: { 
      'X-API-KEY': 'c4367eda-abb6-11ed-b362-0adb4fd9a356'
    }
  };
  
  axios(config)
  .then(function (response) {
    // console.log(response.data);
    res.send(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });

})


module.exports =router