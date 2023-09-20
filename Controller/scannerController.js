const CryptoJS = require('crypto-js')
const { generateJWT } = require('../Middleware/jwtMiddleware')
const EventModel = require('../Model/EventModel')
const UserModel = require('../Model/UserModel')

// @desc Scanner Login
// @route POST /api/scanner/login
// @access Private
const scannerLogin = async (req, res) => {
    // compare email
    const emailVerify = await UserModel.where({userName : req.body.userName}).findOne().select('_id').exec()
    if(!emailVerify) return res.status(500).json({message : 'No scanner found'})
    // compare token
    const tokenVerify = await EventModel.where({token : req.body.token, createdBy : emailVerify._id}).findOne()
    if(!tokenVerify) return res.status(500).json({message : 'No scanner found'})

    const data = tokenVerify
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.ENCRYPT_SECRET).toString()

    return res.status(200).json({token : generateJWT(encryptedData)})
}

module.exports = {
    scannerLogin
}