const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');

const authMiddleware = async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token are not available, please try again"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({
            _id: decoded.userId
        })

        req.user = user;
        next()

    }
    catch(err) {
        return res.status(401).json({
            success: false,
            message: "User not login, please try again"
        })
    }

}

module.exports = authMiddleware