import React from "react";
import {MainNavbar} from "../components/MainNavbar";
import {Outlet} from "react-router";

export const RootLayout: React.FC = () => {
    return (
        <>
            <MainNavbar></MainNavbar>
            <main>
                <Outlet/>
            </main>
        </>
    );
};
