const express = require('express');
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', async (req, res) => {

    const { username, password } = req.body

    const isUserExist = await userModel.findOne({
        username
    })

    if(isUserExist) {
        return res.status(401).json({
            message: "User already exist"
        })
    }

    const user = await userModel.create({
        username, password
    })

    const token = jwt.sign({
        userId : user._id
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('token', token)

    const userObj = user.toObject()

    delete userObj.password
    delete userObj.__v

    res.status(201).json({
        message: "User register successfully",
        user: userObj
    })

})

router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    const user = await userModel.findOne({
        username
    })

    if(!user) {
        return res.status(401).json({
            message: "User not exist"
        })
    }

    const isPassword = password === user.password

    if(!isPassword) {
        return res.status(401).json({
            message: "Wrong password, please try again"
        })
    }

    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('token', token)

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

    if(!token) {
        return res.status(401).json({
            message: "Token not available"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decoded)

        const user = await userModel.findOne({
            _id: decoded.userId
        }).select('-password -__v').lean()

        res.status(200).json({
            message: "Login User",
            user
        })

    }
    catch(err) {
        res.status(401).json({
            message: "Unauthorized token"
        })
    }

})

router.post('/logout', async (req, res) => {

    res.clearCookie('token')

    res.status(200).json({
        message: "User logout successfully"
    })

})

module.exports = router