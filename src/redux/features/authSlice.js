import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  image: null,
  username: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.image = payload.image;
      state.username = payload.username;
      state.accessToken = payload.accessToken;
    },
    logout: (state) => {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.image = null;
      state.username = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
