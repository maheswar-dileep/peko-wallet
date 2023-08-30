import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
};

export const appSlice = createSlice({
  initialState,
  name: 'app_slice',
  reducers: {
    addAccessTokenToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
    },
  },
});

export const { addAccessTokenToken, logout } = appSlice.actions;
export default appSlice.reducer;
