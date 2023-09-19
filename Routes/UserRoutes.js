const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URI)

const urlEncodeParser = bodyParser.urlencoded({extended : false})

const {
    registerNewUser,
    userLogin,
    deleteUser,
    updateUserData,
    getUserDashboard
} = require('../Controller/userController')

const { protectedRoute } = require('../Middleware/jwtMiddleware')

// registration route
router.post('/register', urlEncodeParser ,registerNewUser)

// login route
router.post('/login', urlEncodeParser, userLogin)

// User data update route
router.put('/:id', updateUserData)

// Delete user
router.delete('/:id', deleteUser)

// User Data
router.get('/dashboard', protectedRoute, getUserDashboard)

module.exports = router