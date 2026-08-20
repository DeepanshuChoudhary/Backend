const express = require('express')

const router = express.Router();

router.use((req, res, next) => {
    console.log("This is 2nd middleware in between router and API")
    next()
})

router.get('/', (req, res) => {
    console.log("Welcome to the API")
    res.status(200).json({
        message: "Welcome to the API"
    })
})

module.exports = router