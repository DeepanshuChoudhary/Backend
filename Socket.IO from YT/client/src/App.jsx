import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client'

const App = () => {

  // const socket = io('http://localhost:3000')

  const socket = useMemo(() => io('http://localhost:3000'), [])

  const [message, setMessage] = useState("")
  const [room, setRoom] = useState("")
  const [socketId, setSocketId] = useState("")
  const [moreMessage, setMoreMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room })
    setMessage("")
    setRoom("")
  }

  useEffect(() => {
    socket.on('connect', () => {
      setSocketId(socket.id);
      console.log("Connected ", socket.id)
    })


    socket.on('receive-message', (data) => {
      console.log(data)
      setMoreMessage((message) => [...messages, data])
    })

    socket.on('welcome', (value) => {
      console.log(value)
    })

    return () => {
      socket.disconnect();
    }

  }, [])

  return (
    <div>

      <div>
        Welcome to Socket.io
      </div>

      <div>
        {socketId}
      </div>

      <form onSubmit={handleSubmit}>

        <textarea value={message} label="message" onChange={(e) => setMessage(e.target.value)}
          placeholder='Message...'></textarea>

        <textarea value={room} label="room" onChange={(e) => setRoom(e.target.value)}
          placeholder='Room...'></textarea>

        <button type='submit'>Send</button>

      </form>

    </div>
  )
}

export default App;