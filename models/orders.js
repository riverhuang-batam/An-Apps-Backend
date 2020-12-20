const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pets: {type: mongoose.Schema.Types.ObjectId, ref: 'Pets', required: true},
    quantity: {type: Number, default: 1}
})
module.exports = mongoose.model('Order', orderSchema)