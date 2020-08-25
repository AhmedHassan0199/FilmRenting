const express = require('express')
const users = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const user = require('../Models/User');
const User = require('../Models/User');
users.use(cors())

process.env.SECRET_KEY = 'secret'
users.post('/register', (req, res) => {
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        phone_Number: req.body.phone_Number
    }

    User.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData).then(user => {
                    res.json({ status: user.username + ' registered' })
                }).catch(err => {
                    res.send('error ' + err)
                })
            })
        }
        else {
            res.json({ error: 'User already exists' })
        }
    }).catch(err => {
        res.send("error : " + err)
    })
})

users.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        console.log("USER :" + user)
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const Data = {
                    username: user.first_name,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    phone_Number: user.phone_number
                }
                let token = jwt.sign(Data, process.env.SECRET_KEY, {
                    expiresIn: 1500
                })
                res.send(token)
            }
            else {
                res.json({ error: "Wrong Password" })
            }
        }
        else {
            res.json({ error: "User Doesn't Exist" })
        }
    }).catch(err => {
        res.send('error ' + err)
    })
})

users.post('/profile',(req,res)=>{
    var Decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    
    User.findOne({
        _id: Decoded._id
    }).then(user =>{
        if(user)
        {
            res.json(user)
        }
        else
        {
            res.send("User doesnt exist")
        }
    }).catch(err =>{
        res.send('error '+err)
    })
})

module.exports = users