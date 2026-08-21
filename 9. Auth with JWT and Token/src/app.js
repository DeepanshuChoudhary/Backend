const express = require('express');
const connectDB = require('./db/db')
const userRouter = require('./routes/user.routes')

const app = express()
connectDB()

app.use(express.json())
app.use('/auth', userRouter)


module.exports = app;