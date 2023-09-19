const { Schema, default: mongoose, mongo } = require('mongoose');

const barcodeModel = new Schema({
    hashedBarcode : {
        type : String
    },
    encryptedBarcode : {
        type : String
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    atEvent : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Event'
    }],
    quota : {
        type : Number,
        default : 2
    }
},
{timestamps : true})

module.exports = mongoose.model('Barcode', barcodeModel)