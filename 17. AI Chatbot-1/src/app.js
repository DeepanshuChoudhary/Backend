const express = require('express');

const app = express()

app.get('/', (req, res) => {
    res.send("Connection Done")
})

module.exports = app;