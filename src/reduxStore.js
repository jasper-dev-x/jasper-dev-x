import { configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import accountReducer from "./reduxPie/accountSlice";
import cartReducer from './reduxPie/cartSlice';
import inventoryReducer from './reduxPie/inventorySlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const rootReducer = combineReducers({
    accounts: accountReducer,
    cart: cartReducer,
    inventory: inventoryReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reduxStore = configureStore({
    reducer: persistedReducer,
    // FIXES SERIALIZATION ISSUE
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
});
