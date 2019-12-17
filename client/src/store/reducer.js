import { SET_USER } from "./actions";
const initialState = {
  user: null
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      state.user = action.payload;
      return state;
    default:
      return state;
  }
};