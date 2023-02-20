const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const maskSchema = new Schema({
    name: String,
    amount: Number,
    pricePerPiece: Number
})

module.exports = mongoose.model("Mask", maskSchema);