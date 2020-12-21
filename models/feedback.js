const mongoose = require('mongoose')

const feedbackSchema  = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subject: {type: String, required: true},
    // images: {type: Array, required: true},
    description: {type: String, required: true},
    sendById:{type: String, required: true},
    created_at: { type: Date, required: true, default: Date.now }
})
module.exports = mongoose.model('Feedback', feedbackSchema)