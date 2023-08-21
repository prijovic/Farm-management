import React from 'react';
import './App.css';
import {RouterProvider} from "react-router";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {RootLayout} from "./layouts/RootLayout";
import {AuthPage} from "./pages/AuthPage";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {HomePage} from "./pages/HomePage";
import {useAppSelector} from "./store/hooks";
import {selectTheme} from "./store/features/uiSlice";
import {Notification} from "./components/Notification";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index={true} element={<HomePage/>}/>
            <Route path="auth/:mode" element={<AuthPage/>}/>
        </Route>
    )
);

function App() {
    const theme = useAppSelector(selectTheme);

    return (<LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={createTheme({palette: {mode: theme}})}>
            <CssBaseline/>
            <Notification/>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </LocalizationProvider>);
}

export default App;
