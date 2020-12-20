const mongoose = require('mongoose')
const Order = require('../models/orders')
const Pet = require('../models/pet')

module.exports = {
    orderGetAll: (req, res) => {
        Order.find()
        // .select('product quantity _id')
        // .populate('product', 'name price')
        .then(results => {
            res.status(200).json({
                count: results.length,
                orders: results.map(result => {
                    return {
                        _id: result._id,
                        pets: result.pets,
                        quantity: result.quantity,
                        request: {
                            type: 'GET',
                            url: `http://localhost:5001/orders/${result._id}`
                        }
                    }
                })
            })
        })
        .catch(err => res.json({error: err}))
    },

    orderPost:  (req, res) => {
      console.log(req.body.pets)
        Pet.findById(req.body.pets)
        .then(product => {
          console.log(product, '=====================')
            if(!product){
                return res.status(404).json({
                    message: "Product not found"
                })
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                pets: req.body.pets
            });
            return order.save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order Stored',
                createdOrder: {
                    _id: result._id,
                    pets: result.pets,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:5001/orders/'
                }
                }) 
        })
        .catch(err => {
            res.status(500).json({
                message: 'Product not found',
                error: err
            })
        })   
    },
    orderGetById: (req, res, next) => {
        Order.findById(req.params.orderId)
        .then(order => {
            if(!order){
                res.status(404).json({
                    message: "order not found"
                })
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5001/orders'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    },
    orderDeleteById: (req, res, next) => {
        Order.remove({_id: req.params.orderId})
        .then(result => {
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: "POST",
                    url: "http://localhost:5001/orders",
                    body: {productId: 'ID', quantity: 'Number'}
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
    }
}