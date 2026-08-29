const express = require('express');
const connectDB = require('./db/db')
const authRouter = require('./routes/auth.routes')
const cookies = require('cookie-parser')

const app = express()
connectDB()

app.use(express.json())
app.use(cookies())
app.use('/api/auth', authRouter)

module.exports = app;