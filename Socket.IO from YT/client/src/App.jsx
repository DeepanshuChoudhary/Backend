import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client'

const App = () => {

  // const socket = io('http://localhost:3000')

  const socket = useMemo(() => io('http://localhost:3000'), [])

  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message)
    setMessage("")
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected ", socket.id)

      socket.on('welcome', (value) => {
        console.log(value)
      })
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

      <form onSubmit={handleSubmit}>

        <textarea value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder='Enter...'></textarea>
        <button type='submit'>Send</button>

      </form>

    </div>
  )
}

export default App;