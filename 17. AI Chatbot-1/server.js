require('dotenv').config()
const app = require('./src/app');
const { createServer } = require('http');
const { Server } = require('socket.io')
const generateAIResponse = require('./src/services/ai.service')

const httpServer = createServer(app);
const io = new Server(httpServer, {})

io.on('connection', (socket) => {
    // console.log(socket);
    console.log("A user connected")

    socket.on("disconnect", () => {
        console.log("A user disconnected")
    })

    // socket.on("message", (data) => {
    //     console.log("Message received")
    //     console.log(data)

    //     socket.emit("message", "Message received successfully")
    // })

    socket.on('ai-message', async (data) => {
        console.log("AI Message send by me: ", data.prompt)
        const response = await generateAIResponse(data.prompt)
        console.log("AI Response: ", response)

        socket.emit('ai-message', { response })
    })


})

httpServer.listen(3000, () => {
    console.log("Server running on port 3000")
})

// app.listen(3000, () => {
//     console.log("Server running on port 3000")
// })