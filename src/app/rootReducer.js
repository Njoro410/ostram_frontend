import themeReducer from '../features/theme/themeSlice'
import { apiSlice } from "./api/apiSlice"
import authReducer from '../features/auth/authSlice'
import { combineReducers } from '@reduxjs/toolkit';
import weatherApi  from './api/weatherSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
  auth: authReducer
});

export default rootReducer;