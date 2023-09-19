const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URI)

const urlEncodeParser = bodyParser.urlencoded({extended : false})

const {
    eventRegister,
    getAssignBarcode
} = require('../Controller/eventController')

const { protectedRoute } = require('../Middleware/jwtMiddleware')
