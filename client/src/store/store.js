import { configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './userSlice';

const store = configureStore({
  reducer: userReducer
});

export default store;