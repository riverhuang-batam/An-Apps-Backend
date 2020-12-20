const express = require('express')
const router = express.Router();
const OrderController = require('../controllers/orders')
const checkAuth = require('../middleware/check-auth')
router.get('/', OrderController.orderGetAll)
router.post('/', OrderController.orderPost)
router.get('/:orderId', OrderController.orderGetById)

router.delete('/:orderId', OrderController.orderDeleteById)

module.exports = router;