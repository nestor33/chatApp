const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['Get', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Connected Socket ID: ${socket.id}`);

  socket.on('connectTheChat', (data) => {
    socket.join(data);

    console.log(`User: ${socket.id} connected the chat: ${data}`);
  });

  socket.on('doesNotConnected', () => {
    socket.join();
    console.log(`User: ${socket.id} was not connected`);
  });

  socket.on('sendMessage', (data) => {
    socket.to(data.chat).emit('getMessage', data);
  });
  socket.on('disconnect', () => {
    console.log(`Disconnected Socket ID: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log('running');
});
