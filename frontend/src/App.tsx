import React from 'react';
import './App.css';
import {RouterProvider} from "react-router";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {RootLayout} from "./layouts/RootLayout";
import {AuthPage} from "./pages/AuthPage";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route path="auth/:mode" element={<AuthPage/>}/>
        </Route>
    )
);

function App() {
    return (<LocalizationProvider dateAdapter={AdapterMoment}>
        <RouterProvider router={router}/>
    </LocalizationProvider>);
}

export default App;
