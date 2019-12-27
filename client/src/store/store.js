import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './user/userSlice';
import productsReducer from './products/productsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer
  },
  middleware : [thunk]
});

export default store;