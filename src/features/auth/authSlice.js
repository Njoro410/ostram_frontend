import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    accessToken: null,
    refreshToken: null,
  };


  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
          state.isLoading = true;
          state.error = null;
        },
        loginSuccess: (state, action) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        },
        loginFail: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      },
  })

  export const { loginStart, loginSuccess, loginFail } = authSlice.actions;

  export default authSlice.reducer;