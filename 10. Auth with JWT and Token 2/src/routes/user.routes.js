const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', async (req, res) => {

    const { username, password } = req.body

    const user = await userModel.findOne({
        username
    })

    if(user) {
        return res.status(409).json({
            message: "This username already exist"
        })
    }

    const data = await userModel.create({
        username, password
    })

    const token = jwt.sign({
        _id: data._id
    }, process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(201).json({
        message: "User registered successfully",
        data
    })

})

router.post('/login', async (req, res) => {

    const { username, password } = req.body

    const user = await userModel.findOne({
        username
    })

    if (!user) {
        return res.status(401).json({
            message: "User not found, please try again"
        })
    }

    const isPassword = password == user.password

    if (!isPassword) {
        return res.status(401).json({
            message: "Wrong password, please try again"
        })
    }

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(200).json({
        message: "User login successfully",
        user
    })

})

router.get('/user', async (req, res) => {

    const { token } = req.cookies

    if(!token) {
        return res.status(401).json({
            message: "Invalid token, please try again"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const data = await userModel.findOne({
        _id : decoded._id
    })

    res.status(200).json({
        message: "User still login",
        data
    })

})

module.exports = router