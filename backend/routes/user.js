const express = require('express')

const router = express.Router()
const { loginUser , signupUser} =require('../controller/userController')
//login
router.post('/login' , loginUser )



//sign up
router.post('/signup' , signupUser )
module.exports = router