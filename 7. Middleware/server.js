require('dotenv').config();
const express = require('express');
const connectDB = require('./src/db/db');
const nodeModel = require('./src/model/note.model');

const app = express();
connectDB();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});