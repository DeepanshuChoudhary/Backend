const app = require('./src/app')
const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST'],
        credentials: true
    }
})

io.on("connection", (socket) => {

    console.log("User connected, ID : ", socket.id)

    // socket.emit("welcome", `Welcome to the server`)
    // socket.broadcast.emit("welcome", `Socket Id : ${socket.id} join this server`)

    socket.on("message", (data) => {
        console.log(data);
        // socket.broadcast.emit("receive-message", data)
        socket.to(data.room).emit("receive-message", data)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected : ", socket.id)
    })

})

httpServer.listen(3000, () => {
    console.log("Server running on port 3000")
})