const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log("Hello world")
    res.send("Ok")
})

module.exports = app;