const io = require('socket.io')(server);
const userSocketMap = new Map(); // Map to store user ID to socket ID mapping

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    // When a user logs in or identifies themselves
    socket.on('register user', (userId) => {
        userSocketMap.set(userId, socket.id);
        console.log(`User ${userId} mapped to socket ${socket.id}`);
    });

    // When sending a message to a specific user
    socket.on('send private message', ({userId, message}) => {
        const targetSocketId = userSocketMap.get(userId);
        if (targetSocketId) {
            io.to(targetSocketId).emit('private message', message);
            console.log(`Message sent to user ${userId} through socket ${targetSocketId}`);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        userSocketMap.forEach((value, key) => {
            if (value === socket.id) {
                userSocketMap.delete(key);
                console.log(`User ${key} (socket ${socket.id}) disconnected`);
            }
        });
    });
});
