const io = require('socket.io')();

io.on('connection', () => {

});

const port = process.env.SOCKET_PORT || 8000;
io.listen(port);
console.log(`listening socket on port ${port}`);