const io = require('socket.io')();

io.on('connection', client => {
  client.on('subscribeToProductsPrices', () => {
    console.log('client is subscribing to products prices');
    setInterval(async () => {

      client.emit('timer', new Date());
    }, 60000);
  });
});

const port = process.env.SOCKET_PORT || 8000;
io.listen(port);
console.log(`listening socket on port ${port}`);