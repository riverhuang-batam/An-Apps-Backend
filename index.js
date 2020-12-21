const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors');
require('dotenv').config()

const petsRoutes = require('./routes/pets')
const userRoutes = require('./routes/user')
const ordersRoutes = require('./routes/orders')
const feedbackRoutes = require('./routes/feedback')
const categoryRoutes = require('./routes/category')
const articleRoutes = require('./routes/article')

mongoose.connect('mongodb://localhost:27017/anapps', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true}, (err) => {
    if(err){
        console.log(err)
    } else
    console.log('mongodb connected')
})
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Accept, Authorization")
    next()
})

app.use('/pets', petsRoutes)
app.use('/user', userRoutes)
app.use('/orders', ordersRoutes)
app.use('/feedback', feedbackRoutes)
app.use('/category', categoryRoutes)
app.use('/article', articleRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

app.listen(process.env.PORT, process.env.IP_SERVER, () => console.log(`opening in localhost:${process.env.PORT}`))
