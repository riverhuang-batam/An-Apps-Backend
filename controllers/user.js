const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
module.exports = {
    getAllUser:(req, res) => {
        User.find()
        .then(result => {
            res.status(200).json({
                result
            })
        })
        .catch(err => res.status(500).json(err))
    },
    getUserDetail:(req, res) => {
        const id = req.params.id
        console.log(req.params)
        User.findById(id)
        .then(result => {
            if(result){
                res.status(200).json({
                    result
                })
            } else {
                res.status(404).json({
                    message: "User Not Found"
                })
            }
        })
        .catch(err => res.status(500).json(err))
    },
    signup: (req, res)  => {
        User.find({email: req.body.email})
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message: 'email already exist'
                })
            } else {

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                        .then(result => {
                            res.status(201).json({
                                message: "User Created"
                            })
                        })
                        .catch(err => res.status(500).json({message: err}))
                    }
                })
                
            }
        })
        .catch(err => res.status(500).json({
            error: err
        }))
    },
    login: (req, res) => {
        User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length < 1){
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        message: "Auth Failed"
                    })
                }
                if(result){
                    const token = jwt.sign({
                        userId: user[0]._id,
                        email: user[0].email,
                        username: user[0].username
                    }, process.env.JWT_SECRET)
                    return res.status(200).json({
                        message: "Login Successed",
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Auth Failed'
                })
            })
        })
        .catch(err => res.status(500).json(err))
    },
    deleteUser: (req, res) => {
        User.remove({_id: req.params.id})
        .then(result => {
            res.status(200).json({
                message: "User Deleted"
            })
        })
        .catch(err => res.status(500).json(err))
    },
    editUser: (req, res) => {
    
    
      userId = req.params.userId;
      console.log(req.body)
        User.findById(userId)
        .then((result) => {
          User.findByIdAndUpdate(
            userId,
            {
              username: req.body.username 
            },
          )
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    
  } 
}