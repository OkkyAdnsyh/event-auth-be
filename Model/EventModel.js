const { Schema, default: mongoose } = require('mongoose')

const eventModel = new Schema({
    scheduledAt : {
        date : {
            type : String
        },
        month : {
            type : String 
        },
        year : {
            type : String
        }
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true})

module.exports = mongoose.model('Event', eventModel)