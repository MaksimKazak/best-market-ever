const io = require('socket.io')();
const ProductsUpdateEventEmitter = require('./ProductsUpdateEventEmitter');
const eventEmitter = new ProductsUpdateEventEmitter();
eventEmitter.run();

io.on('connection', client => {
  client.on('subscribeToProductsPrices', () => {
    console.log('client is subscribing to products prices');
    eventEmitter.addListener(products => {
      client.emit('productsUpdated', products);
    });
  });
});

const port = process.env.SOCKET_PORT || 8000;
io.listen(port);
console.log(`listening socket on port ${port}`);