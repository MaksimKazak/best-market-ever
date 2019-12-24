import { configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './userSlice';
import { reducer as productsReducer } from './productsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer
  }
});

export default store;