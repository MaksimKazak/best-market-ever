import openSocket from 'socket.io-client';
const socket = openSocket(process.env.REACT_APP_SOCKET_URL);

function subscribeToProductsPrices(cb) {
  socket.emit('subscribeToProductsPrices');
  socket.on('productsUpdated', timestamp => cb(null, timestamp));
}
export { subscribeToProductsPrices }