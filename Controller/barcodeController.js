const BarcodeModel = require('../Model/BarcodeModel')
const CryptoJS = require('crypto-js') 
const bcrypt = require('bcryptjs')

// @desc Register New Barcode
// @route POST /api/barcode/register
// @access Private
const registerNewBarcode = async (req,res) => {
     // check if data correctly requested
     if(!req.body.barcodeNumber) return res.status(400).json({message : 'Barcode is not define'})
     // check if barcode is already exists
        const existsBarcode = await BarcodeModel.where({createdBy : req.user._id}).find().select('hashedBarcode').exec()
        for(const barcode of existsBarcode){
            const match = await bcrypt.compareSync(req.body.barcodeNumber, barcode.hashedBarcode)

            if(match) return res.status(400).json({message : 'Barcode already registered'})
        } 

        // encrypt barcode
        const encryptedBarcode = CryptoJS.AES.encrypt(req.body.barcodeNumber, process.env.ENCRYPT_SECRET).toString()
        const salt = bcrypt.genSaltSync(10)
        const hashedBarcode = bcrypt.hashSync(req.body.barcodeNumber, salt)

        // set new barcode
        const newBarcode = new BarcodeModel({
            hashedBarcode : hashedBarcode,
            encryptedBarcode : encryptedBarcode,
            createdBy : req.user._id
        })
    try{
        await newBarcode.save()
        return res.status(200).json({message : 'Register barcode success'})
    }catch{
        return res.status(400).json({message : 'Failed to save barcode'})
    }
}

// @desc Verified and Update Barcode
// @route POST /api/barcode/verify
// @access Private
const verifyBarcode = async (req,res) => {
    // check if data correctly requested
    if(!req.body.barcodeNumber) return res.status(400).json({message : 'Barcode is not define'})
    // check if barcode is already exists
    const existsBarcode = await BarcodeModel.where({createdBy : req.user._id}).find().select('hashedBarcode quota').exec()
    for(const barcode of existsBarcode){
        const match = await bcrypt.compareSync(req.body.barcodeNumber, barcode.hashedBarcode)

        if(match){
            if(barcode.quota === 0){
                return res.status(401).json({message : 'Access denied, no quota left'})
            }
            barcode.quota--
            await barcode.save()
            return res.status(200).json({message : `Access granted`})
        }
    }

    return res.status(400).json({message : 'Barcode not registered'})
}

// @desc Get Barcode Based On Event
// @route GET /api/barcode/byEvent
// @access Private
const getBarcodeByEvent = async (req,res) => {
    // 
}

// @desc Get All Barcode
// @route GET /api/barcode/
// @access Private
const getBarcode = async (req,res) => {
    try{
        const barcodeData = await BarcodeModel.where({createdBy : req.user._id}).find().select('-_id').exec()
        return res.status(200).json(barcodeData)
    } catch {
        return res.status(500).json({message : 'Data not found'})
    }
}

module.exports = {
    registerNewBarcode,
    verifyBarcode,
    getBarcodeByEvent,
    getBarcode
}