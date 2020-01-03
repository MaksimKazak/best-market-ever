const io = require('socket.io')();
const ProductsUpdateEventEmitter = require('./ProductsUpdateEventEmitter');
const eventEmitter = new ProductsUpdateEventEmitter();
eventEmitter.run();

io.on('connection', client => {
  client.on('subscribeToProductsPrices', () => {
    console.log('client is subscribing to products prices');

    const productsListener = products => {
      client.emit('productsUpdated', products);
    };

    eventEmitter.addListener(productsListener);

    client.on('disconnect', () => {
      eventEmitter.removeListener(productsListener);
    });
  });
});

const port = process.env.SOCKET_PORT || 8000;
io.listen(port);
console.log(`listening socket on port ${port}`);