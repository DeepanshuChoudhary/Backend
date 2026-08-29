const express = require('express');
const connectDB = require('./db/db')
const authRouter = require('./routes/auth.routes')
const cookies = require('cookie-parser')
const postRouter = require('./routes/post.routes')

const app = express()
connectDB()

app.use(express.json())
app.use(cookies())
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)

module.exports = app;