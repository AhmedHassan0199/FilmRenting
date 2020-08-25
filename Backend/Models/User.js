const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userScehema = new Schema({
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone_Number : {
        type : String
    }    
})


module.exports = User = mongoose.model('users',userScehema)