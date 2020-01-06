import openSocket from 'socket.io-client';
const socket = openSocket(process.env.REACT_APP_SOCKET_URL);

function subscribeToProductsPrices(cb) {
  socket.emit('subscribeToProductsPrices');
  socket.on('productsUpdated', products => cb(null, products));
}
export { subscribeToProductsPrices }