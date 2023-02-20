const express = require ('express')
const cors = require ('cors')
const app = express()

const mongoose = require('mongoose');
const Partner = require('./models/partner')
const Mask = require('./models/mask')
const User = require('./models/user')
const users = require("./users")

const partnerRoutes = require("./routes/partner")
const userRoutes = require("./routes/user")
const orderRoutes = require("./routes/order")

const port = 3000

app.use(cors())
app.use(express.json())

const init = async () => {
 /*    const response = await fetch('https://api.billingo.hu/v3/partners' ,{
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'c4367eda-abb6-11ed-b362-0adb4fd9a356'
          },
    })
    const data = await response.json()
    console.log(data.data)
    Partner.insertMany(data.data)
    // data.map (userData => {
    //     const user = new User(userData)
    //     user.save()
    // })  */
/*     const mask = new Mask({
        name:"Mask",
        amount: 10000,
        pricePerPiece: 1000
    })
    await mask.save() */
    // User.insertMany(users)
}

mongoose.connect('mongodb+srv://ffp2_stock:132435@cluster0.7jt7hlv.mongodb.net/mask_ordering_app')
.then(res => {
    // mongoose.connection.db.dropDatabase()
    //  init()
    console.log(`Connection Succesful ${res}`)})
.catch(err => console.log(`Error in DB connection ${err}`));


app.use("/partners", partnerRoutes)
app.use("/users", userRoutes)
app.use("/order", orderRoutes)

app.get("/", (req,res) => {
    console.log("hello")
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  });