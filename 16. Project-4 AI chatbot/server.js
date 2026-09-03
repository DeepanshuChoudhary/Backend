const app = require('./src/app');
const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer(app);
const io = new Server(httpServer)

io.on("hello", (socket) => {
    // console.log(socket)
})

httpServer.listen(3000, () => {
    console.log("Socket server running on port 3000")
})

// app.listen(3000, () => {
//     console.log("Server running on port 3000")
// })