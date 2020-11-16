const mongoose = require('mongoose')

const petSchema  = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    petName: {type: String, required: true},
    price: {type: Number, required: true},
    petImages: {type: Array, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
    posted_by: {type: String, required: true},
    create_at: {type: Date, timestamps: true},
})
module.exports = mongoose.model('Pet', petSchema)