const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', async (req, res) => {

    const { username, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        username
    })

    if(isUserAlreadyExist) {
        return res.status(409).json({
            message: "This username already exist"
        })
    }

    const data = await userModel.create({
        username, password
    })

    const token = jwt.sign({
        _id: data._id
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('token', token, {
        maxAge: 24*60*60*1000,
        httpOnly: true
    })

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

    const userObj = user.toObject();

    delete userObj.password
    delete userObj.__v;

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('token', token, {
        maxAge: 24*60*60*1000,
        httpOnly: true
    })

    res.status(200).json({
        message: "User login successfully",
        user: userObj
    })

})

router.get('/user', async (req, res) => {

    const { token } = req.cookies

    if(!token) {
        return res.status(401).json({
            message: "Invalid token, please try again"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        const data = await userModel.findOne({
            _id : decoded._id
        }).select("-password -__v").lean()
    
        return res.status(200).json({
            message: "User still login",
            data
        })
    }
    catch(err) {
        res.status(401).json({
            message: "Invalid token"
        })
    }

})

router.post('/logout', async (req, res) => {

    res.clearCookie("token")

    res.status(200).json({
        message: "Logout successfully"
    })

})

module.exports = router