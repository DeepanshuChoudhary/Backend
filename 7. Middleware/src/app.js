const express = require('express');
const indexRoutes = require('./routes/index.routes')

const app = express()

app.use(express.json())

app.use((req,res, next) => {
    console.log("This is a Middleware in between app and route")
    next()
})
app.use('/', indexRoutes)

module.exports = app