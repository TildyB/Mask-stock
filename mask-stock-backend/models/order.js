const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
        partner_id: Number,
        block_id: Number,
        type: String,
        fulfillment_date: Date,
        due_date: Date,
        payment_method: String,
        language: String,
        currency: String ,
        conversion_rate: Number,
        items: [
            {
              product_id: Number,
              quantity: Number,
              comment: String
            }] 
})

module.exports = mongoose.model("Order", orderSchema);