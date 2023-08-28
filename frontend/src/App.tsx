import React from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { RouterProvider } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useAppSelector } from "./store/hooks";
import { selectTheme } from "./store/features/uiSlice";
import { Notification } from "./components/Notification";
import { router } from "./router";

function App() {
  const theme = useAppSelector(selectTheme);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={createTheme({ palette: { mode: theme } })}>
        <CssBaseline />
        <Notification />
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
