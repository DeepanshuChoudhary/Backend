const express = require('express');
const connectDB = require('./db/db')
const authRoutes = require('./routes/auth.routes')

const app = express()

app.use(express.json())
app.use('/auth', authRoutes)
connectDB()

module.exports = app