import { configureStore } from "@reduxjs/toolkit"
// import themeReducer from '../features/theme/themeSlice'
import { apiSlice } from "./api/apiSlice"
// import authReducer from '../features/auth/authSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

const persistConfig = {
    key: "root",
    storage,
    blacklist:[rootReducer.theme]
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export const persistor = persistStore(store);