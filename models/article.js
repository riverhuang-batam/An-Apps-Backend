const mongoose = require('mongoose')

const articleSchema  = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    articleImages: {type: Array, required: true},
    description: {type: String, required: true},
    postedById:{type: String},
    created_at: { type: Date, required: true, default: Date.now }
})
module.exports = mongoose.model('Article', articleSchema)