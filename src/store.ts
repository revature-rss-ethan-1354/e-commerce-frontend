import { configureStore, combineReducers } from "@reduxjs/toolkit";

import roleReducer from './remote/e-commerce-api/authService';

export const store = configureStore({
    reducer: {
        role: roleReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;