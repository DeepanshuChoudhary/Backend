const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
    console.log("This is .get router")
    res.status(200).json({
        message: "Welcome to the API"
    })
})

module.exports = router