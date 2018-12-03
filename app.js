const express = require('express');
const app = express();
const socket = require('socket.io');
const server = app.listen('3000', () => {
  console.log('Server listening on port 3000...');
});

app.use(express.static('public'));
const io = socket(server);
io.on('connection', (socket) => {
  console.log('Established socket connection!', socket.id);

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
