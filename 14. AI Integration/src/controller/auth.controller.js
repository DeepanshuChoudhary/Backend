const userModel = require("../model/user.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {

    const { username, password } = req.body;

    const isUserExist = await userModel.findOne({
        username
    })

    if(isUserExist) {
        return res.status(401).json({
            success: false,
            message: "User already exist"
        })
    }

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('token', token, {
        maxAge: 24*60*60*1000,
        httpOnly: true
    })

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
    })

}

const loginController = async (req, res) => {

    const { username, password } = req.body;

    const user = await userModel.findOne({
        username
    })

    if(!username) {
        return res.status(401).json({
            success: false,
            message: "User not exist"
        })
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if(!isPassword) {
        return res.status(401).json({
            success: false,
            message: "Wrong password"
        })
    }

    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('token', token)

    res.status(200).json({
        success: true,
        message: "User login successfully",
        user
    })

}

const userController = async (req, res) => {

    const { token } = req.cookies

    if(!token) {
        return res.status({
            success: false,
            message: "User are not login"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({
            _id: decoded.userId
        })

        return res.status(200).json({
            success: true,
            message: "Current login user",
            user
        })
    }
    catch(err) {
        res.status(401).json({
            success: false,
            message: "Unauthorized access, please login and try again"
        })
    }

}

const logoutController = async (req, res) => {

    res.clearCookie('token')

    res.status(200).json({
        success: false,
        message: "User logout successfully"
    })

}

module.exports = {
    registerController,
    loginController,
    userController,
    logoutController
}