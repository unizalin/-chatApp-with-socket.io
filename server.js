const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  io.emit('noOfConnections', io.sockets.server.engine.clientsCount)

  socket.on('disconnect', () => {
    io.emit('noOfConnections',  io.sockets.server.engine.clientsCount)
  })

  socket.on('Created',(data)=>{
    socket.broadcast.emit('Created',(data))
  })
  socket.on('chat-message',(data)=>{
    socket.broadcast.emit('chat-message',(data))
  })
  socket.on('typing',(data)=>{
    socket.broadcast.emit('typing',(data))
  })
  socket.on('stopTyping',(data)=>{
    socket.broadcast.emit('stopTyping',(data))
  })

  socket.on('joined',(data)=>{
    socket.broadcast.emit('joined',(data))
  })

  socket.on('leaved',(data)=>{
    socket.broadcast.emit('leaved',(data))
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
