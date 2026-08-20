const express = require('express');
const userModel = require('../models/user.model');

const router = express.Router()

router.post('/register', async (req, res) => {

    const { username, password } = req.body

    const user = await userModel.create({
        username, password
    })

    res.status(201).json({
        message: "User are created",
        user
    })

})

router.post('/login', async (req, res) => {

    const { username, password } = req.body

    const isUserExist = await userModel.findOne({
        username
    })

    if(!isUserExist) {
        console.log("User not-found")

        return res.status(404).json({
            message: "Invalid username"
        })
    }

    const isPasswordValid = password == isUserExist.password

    if(!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    res.status(200).json({
        message: "User login"
    })

})

// router.get('/users', async (req, res) => {

//     const data = await userModel.find()

//     res.status(200).json({
//         message: "There are the all data",
//         data
//     })

// })

module.exports = router