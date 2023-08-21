import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import uiReducer from "./features/uiSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
