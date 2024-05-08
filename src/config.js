const mongoose = require('mongoose')

const connect = mongoose.connect("mongodb://0.0.0.0/Login-tut");

connect.then(() => {
    console.log("Database connect successfully")
}).catch(() => {
    console.log("Database can not connect")
})

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    password: {
        type: String,
        required: true
    }


})
const collection = new mongoose.model("users", LoginSchema)
module.exports = collection;