require('dotenv').config()
const express = require('express')
const connectDB = require('./src/db/db')

const app = express()
app.use(express.json())

connectDB()

let notes = []

// GET
app.get('/notes', (req, res) => {
    res.status(200).json({
        message: "All data",
        notes: notes
    })
})

// POST
app.post('/notes', (req, res) => {

    const { title, content } = req.body

    console.log(title, content)

    // res.status(201).json({
    //     message: "Successfully created",
    //     notes: notes
    // })
})

// DELETE
app.delete('/notes/:index', (req, res) => {
    let index = req.params.index

    delete notes[index]

    res.status(200).json({
        message: "Deleted",
        notes: notes
    })
})

// PATCH
app.patch('/notes/:index', (req, res) => {

    let { title } = req.body
    let { content } = req.body

    notes[req.params.index].title = title
    notes[req.params.index].content = content

    res.status(201).json({
        message: "Updated successfully",
        notes: notes
    })

})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})