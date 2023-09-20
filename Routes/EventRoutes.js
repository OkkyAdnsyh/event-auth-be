const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URI)

const urlEncodeParser = bodyParser.urlencoded({extended : false})

const {
    eventRegister,
    getAllEvent,
    updateEvent,
    deleteEvent
} = require('../Controller/eventController')

const { protectedRoute } = require('../Middleware/jwtMiddleware')

router.post('/register', protectedRoute, urlEncodeParser, eventRegister)
router.get('/', protectedRoute, urlEncodeParser, getAllEvent)
router.put('/:id', protectedRoute, urlEncodeParser, updateEvent)
router.delete('/:id', protectedRoute, deleteEvent)

module.exports = router