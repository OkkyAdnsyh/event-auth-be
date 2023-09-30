const { Schema, default: mongoose } = require("mongoose");

const userModel = new Schema({
    userName : {
        type : String,
        max : 1024,
        min : 6,
        required : [true, 'Please add username']
    },
    email : {
        type : String,
        min : 6,
        max : 1024,
        required : [true, 'Please add email']
    },
    password : {
        type : String,
        min : 8,
        max : 1024,
        required : [true, 'Please add password'],
    }
})

module.exports = mongoose.model('User', userModel)