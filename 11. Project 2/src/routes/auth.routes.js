const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', async (req, res) => {

    const { username, password } = req.body

    const userCheck = await userModel.findOne({
        username
    })

    if (userCheck) {
        return res.status(409).json({
            message: "Username already exist"
        })
    }

    const user = await userModel.create({
        username, password
    })

    const userObj = user.toObject()

    delete userObj.password
    delete userObj.__v

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    })

    res.status(200).json({
        message: "User registered successfully",
        user: userObj
    })

})

router.post('/login', async (req, res) => {

    const { username, password } = req.body

    const user = await userModel.findOne({
        username
    })

    if (!user) {
        return res.status(401).json({
            message: "User not exist"
        })
    }

    const isPassword = password === user.password

    if (!isPassword) {
        return res.status(401).json({
            message: "Wrong password, please try again"
        })
    }

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    })

    const userObj = user.toObject()

    delete userObj.password
    delete userObj.__v

    res.status(200).json({
        message: "User login successfully",
        user: userObj
    })

})

router.get('/user', async (req, res) => {

    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({
            message: "Token are not available"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findOne({
        _id: decoded._id
    }).select("-password").lean()

    if (!user) {
        return res.status(401).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        message: "User login already",
        user
    })

})

router.post('/logout', async (req, res) => {

    res.clearCookie('token')

    res.status(200).json({
        message: "User logout successfully"
    })

})

module.exports = router