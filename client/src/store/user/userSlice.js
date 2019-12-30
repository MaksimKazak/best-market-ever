import { createSlice } from '@reduxjs/toolkit';
const initialUser = {
  username: '',
  email: '',
  balance: 10000,
  type: 'common',
  operations: [],
  resources: {},
  isNotAuthenticated: true
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser: (state, action) => action.payload
  }
});

const { actions, reducer } = userSlice;

export { actions, reducer, initialUser };
export default reducer;