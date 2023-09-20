const jwt = require('jsonwebtoken')
const UserModel = require('../Model/UserModel')
const CryptoJS = require('crypto-js')
const asyncHandler = require('express-async-handler')

function generateJWT(data){
    // generate jwt token
    return jwt.sign({data}, process.env.JWT_SECRET, {
        expiresIn : '1d'
    })
}

const protectedRoute = asyncHandler(async (req,res,next) => {
    let token;

    // check auth header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // get the token
            token = req.headers.authorization.split(" ")[1]

            // verify token
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
            const decryptData = CryptoJS.AES.decrypt(decodeToken.data, process.env.ENCRYPT_SECRET)
            const dataID = JSON.parse(decryptData.toString(CryptoJS.enc.Utf8))
            // decrypt data 
            req.user = await UserModel.findById(dataID.id).select('-password -email')
            next()
        }catch(err){
            return res.status(401).json({message : "Not Authorized"})
        }
    }  
    if(!token) return res.status(401).json({message : "Not Authorized"})
})

const protectedScanner = async (req, res, next) => {
    let token;

    // check auth header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // get the token
            token = req.headers.authorization.split(" ")[1]

            // verify token
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
            const decryptData = CryptoJS.AES.decrypt(decodeToken.data, process.env.ENCRYPT_SECRET)
            const data = JSON.parse(decryptData.toString(CryptoJS.enc.Utf8))
            // decrypt data 
            req.scannerData = data
            next()
        }catch(err){
            return res.status(401).json({message : "Not Authorized"})
        }
    }  
    if(!token) return res.status(401).json({message : "Not Authorized"})
}

module.exports = {
    generateJWT,
    protectedRoute,
    protectedScanner
}