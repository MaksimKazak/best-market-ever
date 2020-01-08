import { openDB } from 'idb';

const DB_NAME = 'demo';
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore('user');
    db.createObjectStore('operations', {
      keyPath: 'id',
      autoIncrement: true
    });
  }
});

export default dbPromise;