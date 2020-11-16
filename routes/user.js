const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user')
router.get('/', userControllers.getAllUser)
router.get('/:id')
router.post('/signup', userControllers.signup)
router.post('/login', userControllers.login)
router.patch('/:userId')
router.delete('/:userId', userControllers.deleteUser)

module.exports = router;