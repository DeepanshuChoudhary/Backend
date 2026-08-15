require('dotenv').config()
const express = require('express');
const connectDB = require('./src/db/db')
const noteModel = require('./src/model/note.model')

const app = express()
app.use(express.json())
connectDB()

app.post('/notes', async (req, res) => {

    const { title, content } = req.body

    await noteModel.create({
        title,
        content
    })

    res.status(201).json({
        message: "Note created successfully",
        title: title,
        content: content
    })

})

app.get('/notes', async (req, res) => {

    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes retrieve",
        notes: notes
    })

})

app.delete('/notes/:id', async (req, res) => {

    const noteId = req.params.id

    await noteModel.findOneAndDelete({
        _id: noteId
    })

    res.status(200).json({
        message: "Note are deleted"
    })

})

app.patch('/notes/:id', async (req, res) => {

    const noteId = req.params.id;

    const { title } = req.body
    const { content } = req.body

    await noteModel.findOneAndUpdate({
        _id: noteId
    }, {
        title: title,
        content: content
    }, {
        new: true
    })
    
    res.status(200).json({
        message: "Title are updated",
        title: req.body,
        content: req.body
    })

})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})