  const { Schema, default: mongoose } = require('mongoose')

  const scannerModel = new Schema({
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    token : {
        type : Number,
        max : 4
    }
  }, {timestamps : true})

  module.exports = mongoose.model('Scanner', scannerModel)