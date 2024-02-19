const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer((req, res) => {
  res.end('Server is running');
});

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listening for private message
  socket.on('private message', ({ content, to }) => {
    socket.to(to).emit('private message', {
      content,
      from: socket.id,
    });
  });

  // When a user joins a private room
  socket.on('join room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });
});