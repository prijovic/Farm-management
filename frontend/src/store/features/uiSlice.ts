import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

interface Notification {
  message: string;
  type: NotificationType;
}

interface UiState {
  theme: Theme;
  notification: Notification | null;
  modal1IsOpened: boolean;
  modal2IsOpened: boolean;
  loading: boolean;
}

const initialState: UiState = {
  theme: Theme.DARK,
  notification: null,
  modal1IsOpened: false,
  modal2IsOpened: false,
  loading: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    },
    showNotification: (state, action: PayloadAction<Notification>) => {
      state.notification = action.payload;
    },
    closeNotification: (state) => {
      state.notification = null;
    },
    toggleModalIsOpened: (state) => {
      state.modal1IsOpened = !state.modal1IsOpened;
    },
    toggleModal2IsOpened: (state) => {
      state.modal2IsOpened = !state.modal2IsOpened;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  toggleTheme,
  showNotification,
  closeNotification,
  toggleModalIsOpened,
  setLoading,
  toggleModal2IsOpened,
} = uiSlice.actions;

export const selectTheme = (state: RootState) => state.ui.theme;
export const selectNotification = (state: RootState) => state.ui.notification;
export const selectModalIsOpened = (state: RootState) =>
  state.ui.modal1IsOpened;
export const selectModal2IsOpened = (state: RootState) =>
  state.ui.modal2IsOpened;
export const selectLoading = (state: RootState) => state.ui.loading;

export default uiSlice.reducer;
