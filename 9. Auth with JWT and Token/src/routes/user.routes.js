const express = require('express');
const userModel = require('../models/user.model');

const router = express.Router()

router.post('/register', async (req, res) => {

    const { username, password } = req.body

    const data = await userModel.create({
        username, password
    })

    res.status(201).json({
        message: "Register account created successfully",
        data: data
    })

})

router.post('/login', async (req, res) => {

    const { username, password } = req.body

    const isUserExist = await userModel.findOne({
        username
    })

    if(!isUserExist) {
        return res.status(401).json({
            message: "Invalid username"
        })
    }

    const passwordValid = password == isUserExist.password

    if(!passwordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    res.status(200).json({
        message: "Login"
    })

})

module.exports = router