import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload
  }
});
const { actions, reducer } = userSlice;

export { actions, reducer };
export default userSlice;