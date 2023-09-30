const UserModel = require("../Model/UserModel")
const CryptoJS = require('crypto-js')
const bcrypt = require('bcryptjs')
const { generateJWT } = require("../Middleware/jwtMiddleware")



// @desc Register New User
// @route POST /api/users/register
// @access Public
const registerNewUser = async (req, res) => {
    // check if all key is field with correct type
    if(!req.body.userName || !req.body.email || !req.body.password) return res.status(400).json({message : 'Please fill all the fields'})
    // check if user already exists
    let existsUser = await UserModel.findOne({email : req.body.email})
    if(existsUser) return res.status(400).json({message : 'Users already exists'})

    // encrypt password
    let salt = bcrypt.genSaltSync(10)
    let encryptedPass = bcrypt.hashSync(req.body.password, salt)

    // save the request body to user model
    let newUser = new UserModel({
        userName : req.body.userName,
        email : req.body.email,
        password : encryptedPass
    })
    // save user data to database
    await newUser.save()

    return res.status(200).json({message : "Register user success"})

    
}
// @desc User Login
// @route POST /api/users/login
// @access Public
const userLogin = async (req, res) => {
    // check if username or email exists
    const userData = await UserModel.findOne({
        $or : [{
            userName : req.body.name
        },{
            email : req.body.name
        }]
    })

    if(!userData) return res.status(400).json({message : "invalid username/email or password"})
    // compare requested password with password in db
    if(!bcrypt.compareSync(req.body.password, userData.password)) return res.status(400).json({message : "Wrong password"})
    // set data payload for jwt
    const dataID = {
        id : userData._id
    }
    // encrypted payload and generate token
    const encryptData = CryptoJS.AES.encrypt(JSON.stringify(dataID), process.env.ENCRYPT_SECRET).toString()
    return res.status(200).json({token : generateJWT(encryptData)})
}
// @desc Update User Data
// @route PUT /api/users/:id
// @access Private
const updateUserData = (req, res) => {
    res.status(200).json({message : `Successfully update user ${req.params.id} data`})
}
// @desc Delete User
// @route DELETE /api/users/:id
// @access Private
const deleteUser = (req, res) => {
    res.status(200).json({message : `User ${req.params.id} no longer exists`})
}
// @desc Get User Dashboard Data
// @route GET /api/users/dashboard
// @access Private                                            
const getUserDashboard = async (req, res) => {
    res.status(200).json(req.user)
}




module.exports = {
    registerNewUser,
    userLogin,
    deleteUser,
    updateUserData,
    getUserDashboard
}