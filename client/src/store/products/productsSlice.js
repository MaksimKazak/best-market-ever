import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: null,
  reducers: {
    setProducts: (state, action) => action.payload
  }
});
const { actions, reducer } = productsSlice;

export { actions, reducer };
export default reducer;