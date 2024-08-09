const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cakeSchema = new Schema({
    cakeName: { type: String, required: true },
    cakeNickname: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    ingredients: [String],
    description: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cake', cakeSchema)