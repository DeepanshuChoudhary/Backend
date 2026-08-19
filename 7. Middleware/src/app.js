const express = require('express');
const connectDB = require('./db/db')
const indexRoutes = require('./routes/index.routes')

const app = express();
connectDB()

app.use('/', indexRoutes);


module.exports = app;