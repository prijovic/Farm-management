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
import {ParcelsPage} from "./pages/ParcelsPage";
import {ParcelEditPage} from "./pages/ParcelEditPage";
import {ParcelDetailsPage} from "./pages/ParcelDetailsPage";
import {ProtectedRoute} from "./router/ProtectedRoute";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index={true} element={<HomePage/>}/>
            <Route path="auth/:mode" element={<AuthPage/>}/>
            <Route path="parcel/all" element={
                <ProtectedRoute>
                    <ParcelsPage/>
                </ProtectedRoute>
            }/>
            <Route path="parcel/new" element={
                <ProtectedRoute>
                    <ParcelEditPage/>
                </ProtectedRoute>
            }/>
            <Route path="parcel/:id" element={
                <ProtectedRoute>
                    <ParcelDetailsPage/>
                </ProtectedRoute>
            }/>
            <Route path="parcel/:id/edit" element={
                <ProtectedRoute>
                    <ParcelEditPage/>
                </ProtectedRoute>
            }/>
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
