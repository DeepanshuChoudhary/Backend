// Building First Project
// 1. Create Notes
// 2. Show all the Notes
// 3. Delete an Note
// 4. Update an note

const express = require('express');

const app = express()
app.use(express.json())

let notes = []

// POST
app.post('/notes', (req,res) => {
    console.log(req.body)
    notes.push(req.body)
    res.status(201).json({
        message: "Success",
        notes: notes
    })
})

// GET
app.get('/notes', (req, res) => {
    res.status(200).json({
        message: "Notes", 
        notes: notes
    })
})

// DELETE
app.delete('/notes/:hello', (req, res) => {
    const index = req.params.hello

    delete notes[index]

    res.json({
        message: "Note deleted successfully"
    })
})

// PATCH /notes/:index
app.patch("/notes/:index", (req,res) => {
    const index = req.params.index
    const {title} = req.body
    // const {content} = req.body

    notes[index].title = title
    // notes[index].content = content

    res.json({
        message: "Note updated successfully",
        title : req.body
    })
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})