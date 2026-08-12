const express = require('express');
const path = require('path');

const app = express();

// Serve static files (CSS, JS, images) from current directory
app.use(express.static(__dirname));

app.get('/home', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Home Page</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h1>Welcome to the Home Page</h1>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});












// const server = http.createServer((req,res) => {
//     res.end("Hello backend..")
// })

// server.listen(3000, () => {
//     console.log("Server is running on port 3000")
// }) 