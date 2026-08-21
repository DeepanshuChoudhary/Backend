const express = require('express');
const connectDB = require('./db/db')
const userRouter = require('./routes/user.routes')
const cookieParser = require("cookie-parser");

const app = express()
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use('/auth', userRouter)


module.exports = app;