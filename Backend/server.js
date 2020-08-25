var express = require('express')
var cors = require('cors')
var boydParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
const bodyParser = require('body-parser')
var port = 5000

app.use(bodyParser.json())
app.use(cors());
app.use(
    boydParser.urlencoded({ extended: false })
);

const MongoURI='mongodb://localhost:27017/LoginCredentials'
//const MongoURI='mongodb+srv://AdminAdmin:2151999619@cluster0.z8tgy.mongodb.net/LoginCredentials?retryWrites=true&w=majority'

mongoose.connect(MongoURI).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

var Users = require('./Routes/Users')

app.use('/users',Users)

app.listen(port,()=>{
    console.log("server is running on port : "+port)
})