import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";

export enum Theme {
    LIGHT = "light",
    DARK = "dark"
}

export enum NotificationType {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info"
}

interface Notification {
    message: string,
    type: NotificationType
}

interface UiState {
    theme: Theme
    notification: Notification | null,
    modalIsOpened: boolean,
}

const initialState: UiState = {
    theme: Theme.DARK,
    notification: null,
    modalIsOpened: false
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
        },
        showNotification: (state, action: PayloadAction<Notification>) => {
            state.notification = action.payload;
        },
        closeNotification: (state) => {
            state.notification = null;
        },
        toggleModalIsOpened: (state) => {
            state.modalIsOpened = !state.modalIsOpened;
        }
    }
});

export const {toggleTheme, showNotification, closeNotification, toggleModalIsOpened} = uiSlice.actions;

export const selectTheme = (state: RootState) => state.ui.theme;
export const selectNotification = (state: RootState) => state.ui.notification;
export const selectModalIsOpened = (state: RootState) => state.ui.modalIsOpened;

export default uiSlice.reducer;
