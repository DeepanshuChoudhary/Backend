const express = require('express')

const app = express();
app.use(express.json())

let notes = []

app.post('/notes', (req,res) => {
    console.log(req.body)
    notes.push(req.body)
    res.status(200).json({
        message: "Notes received successfully",
        notes: notes
    })
})

app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000")
})










// const express = require('express');

// const app = express()

// app.get('/home', (req, res) => {
//     console.log("Home page")
//     res.send("Hello Home")
// })

// app.listen(3000, () => {
//     console.log("Server is running on port 3000")
// })







// const express = require('express')

// const app = express()

// app.get('/home', (req, res) => {
//     console.log("Hello home - terminal")
//     res.send("Hello home")
// })

// app.get('/about', (req, res) => {
//     console.log("Hello About Page - terminal")
//     res.send("Hello About Page")
// })

// app.listen(3000, () => {
//     console.log("Server is running on port 3000")
// })