const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', async (req, res) => {

    const { username, password } = req.body

    const user = await userModel.findOne({
        username
    })

    if (user) {
        return res.status(401).json({
            message: "User already exist"
        })
    }

    const data = await userModel.create({
        username,
        password
    })

    const token = jwt.sign({
        _id: data._id
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    })

    const userObj = data.toObject()

    delete userObj.password
    delete userObj.__v

    res.status(201).json({
        message: "User registered successfully",
        user: userObj
    })

})

router.post('/login', async (req, res) => {

    const { username, password } = req.body

    const isUserExist = await userModel.findOne({
        username
    })

    if (!isUserExist) {
        return res.status(401).json({
            message: "User not exist"
        })
    }

    const isPassword = password == isUserExist.password

    if (!isPassword) {
        return res.status(401).json({
            message: "Wrong password"
        })
    }

    const userObj = isUserExist.toObject()

    delete userObj.password
    delete userObj.__v

    const token = jwt.sign({
        _id: isUserExist.id
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    })

    res.status(200).json({
        message: "Your are login successfully",
        user: userObj
    })

})

router.get('/user', async (req, res) => {

    const { token } = req.cookies

    if(!token) {
        return res.status(401).json({
            message: "User logout"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        const user = await userModel.findOne({
            _id: decoded._id
        }).select('-password -__v').lean()

        if(!user) {
            return res.status(401).json({
                message: "Invalid User"
            })
        }

        return res.status(200).json({
            message: "User login",
            user
        })
        
    }
    catch(err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

})

router.post('/logout', async (req, res) => {

    res.clearCookie('token')

    res.status(200).json({
        message: "User logout"
    })

})

module.exports = router