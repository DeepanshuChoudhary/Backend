const express = require('express');
const connectDB = require('./db/db.js')
const authRouter = require('./routes/auth.routes.js')
const cookie = require('cookie-parser')

const app = express()
connectDB()

app.use(express.json())
app.use(cookie())
app.use('/auth', authRouter)

module.exports = app;