const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URI)

const urlEncodeParser = bodyParser.urlencoded({extended : false})

const {
    registerNewBarcode,
    verifyBarcode,
    getBarcodeByEvent,
    getBarcode
} = require('../Controller/barcodeController')

const { protectedRoute, protectedScanner } = require('../Middleware/jwtMiddleware')

router.post('/register',protectedRoute, urlEncodeParser, registerNewBarcode)
router.post('/verify', protectedScanner, urlEncodeParser, verifyBarcode)
router.get('/byEvent', protectedRoute, getBarcodeByEvent)
router.get('/', protectedRoute, getBarcode)

module.exports = router