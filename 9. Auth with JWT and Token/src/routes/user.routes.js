const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const router = express.Router()

router.post('/register', async (req, res) => {

    const { username, password } = req.body

    const user = await userModel.create({
        username, password
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(201).json({
        message: "Register account created successfully",
        user
    })

})

router.post('/login', async (req, res) => {

    const { username, password } = req.body

    const isUserExist = await userModel.findOne({
        username, password
    })

    if (!isUserExist) {
        return res.status(401).json({
            message: "Invalid input"
        })
    }

    // const passwordValid = password == isUserExist.password

    // if(!passwordValid) {
    //     return res.status(401).json({
    //         message: "Invalid password"
    //     })
    // }

    res.status(200).json({
        message: "Login"
    })

})

router.get('/user', async (req, res) => {

    const { token } = req.cookies

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized access, token not available"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({
            _id: decoded.id
        }).select("-password -__v").lean()

        res.status(200).json({
            message: "User data fetch successfully",
            user
        })

        // res.send(decoded)

    }catch(err) {
        return res.status(401).json({
            message: "Unauthorized - Invalid Token"
        })
    }


    // res.status(200).json({
    //     message: "User login successfully",
    //     decoded
    // })

})

module.exports = router