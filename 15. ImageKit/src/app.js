const express = require('express');
const fileRoutes = require('./routes/files.routers')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use('/api/upload', fileRoutes);

module.exports = app;
