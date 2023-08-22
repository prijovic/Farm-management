import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import uiReducer from "./features/uiSlice";
import parcelReducer from "./features/parcelSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        parcel: parcelReducer,
        ui: uiReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
