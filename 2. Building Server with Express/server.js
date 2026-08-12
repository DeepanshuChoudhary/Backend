const express = require('express');
const path = require('path');

const app = express();

const app = express()

app.get('/home', (req, res) => {
    res.send("Welcome to the Home Page")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})










// const server = http.createServer((req,res) => {
//     res.end("Hello backend..")
// })

// server.listen(3000, () => {
//     console.log("Server is running on port 3000")
// }) 