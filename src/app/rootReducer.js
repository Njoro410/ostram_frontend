import themeReducer from '../features/theme/themeSlice'
import { apiSlice } from "./api/apiSlice"
import authReducer from '../features/auth/authSlice'
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    theme: themeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  });
  
  export default rootReducer;