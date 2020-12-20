const mongoose = require('mongoose')

const petSchema  = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    petName: {type: String, required: true},
    price: {type: Number, required: true},
    petImages: {type: Array, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
    postedById:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    created_at: { type: Date, required: true, default: Date.now }
})
module.exports = mongoose.model('Pet', petSchema)