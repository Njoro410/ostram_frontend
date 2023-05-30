import { configureStore } from "@reduxjs/toolkit"
// import themeReducer from '../features/theme/themeSlice'
import { apiSlice } from "./api/apiSlice"
// import authReducer from '../features/auth/authSlice'
import weatherApi from "./api/weatherSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

const persistConfig = {
    key: "root",
    storage,
    blacklist: [rootReducer.theme]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            // serializableCheck: {
            //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // },
            immutableCheck: false,
            serializableCheck: false,
        }).concat(apiSlice.middleware, weatherApi.middleware),
    devTools: true
})

export const persistor = persistStore(store);