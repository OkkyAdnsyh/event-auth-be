const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URI)

const urlEncodeParser = bodyParser.urlencoded({extended : false})

const {
    scannerLogin,
} = require('../Controller/scannerController')

const { protectedRoute } = require('../Middleware/jwtMiddleware')


router.post('/login', urlEncodeParser, scannerLogin)

module.exports = router