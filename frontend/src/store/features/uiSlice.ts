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

export enum DialogContentType {
  PARCEL_LOCATION_EDIT,
  PARCEL_OPERATION_EDIT,
}

interface Notification {
  message: string;
  type: NotificationType;
}

interface UiState {
  theme: Theme;
  notification: Notification | null;
  dialogIsOpened: boolean;
  dialogContentType: DialogContentType;
  loading: boolean;
}

const initialState: UiState = {
  theme: Theme.DARK,
  notification: null,
  dialogIsOpened: false,
  dialogContentType: DialogContentType.PARCEL_OPERATION_EDIT,
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
    toggleDialogIsOpened: (state, action: PayloadAction<DialogContentType>) => {
      state.dialogIsOpened = !state.dialogIsOpened;
      state.dialogContentType = action.payload;
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
  toggleDialogIsOpened,
  setLoading,
} = uiSlice.actions;

export const selectTheme = (state: RootState) => state.ui.theme;
export const selectNotification = (state: RootState) => state.ui.notification;
export const selectDialogIsOpened = (state: RootState) =>
  state.ui.dialogIsOpened;
export const selectDialogContentType = (state: RootState) =>
  state.ui.dialogContentType;
export const selectLoading = (state: RootState) => state.ui.loading;

export default uiSlice.reducer;
