const express = require('express')
const { registerController, loginController, userGetController, logoutController } = require('../controller/auth.controller')

const router = express.Router()

router.post('/register', registerController)

router.post('/login', loginController)

router.get('/user', userGetController)

router.post('/logout', logoutController)

module.exports = router