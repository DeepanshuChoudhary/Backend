const express = require('express')

const app = express()

app.get('/home', (req, res) => {
    console.log("Hello home - terminal")
    res.send("Hello home")
})

app.get('/about', (req, res) => {
    console.log("Hello About Page - terminal")
    res.send("Hello About Page")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})