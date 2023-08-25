import React, {useEffect} from "react";
import {MainNavbar} from "../components/MainNavbar";
import {Outlet} from "react-router";
import {Grid} from "@mui/material";
import {getToken} from "../utils/auth";
import {useAppDispatch} from "../store/hooks";
import {useNavigate} from "react-router-dom";
import {login} from "../store/features/authSlice";
import {MainFooter} from "../components/MainFooter";

export const RootLayout: React.FC = () => {
    const token = getToken();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            dispatch(login());
            navigate("/", {replace: true});
        }
    }, [token, navigate, dispatch]);

    return (
        <>
            <MainNavbar/>
            <main>
                <Grid justifyContent={"center"} container component="article">
                    <Grid item sx={{display: {xs: "none", sm: "flex"}, flexGrow: "1"}} sm={1} lg={2}></Grid>
                    <Grid item xs={12} sm={10} lg={8}>
                        <Grid container>
                            <Outlet/>
                        </Grid>
                    </Grid>
                    <Grid item sx={{display: {xs: "none", sm: "flex"}, flexGrow: "1"}} sm={1} lg={2}></Grid>
                </Grid>
            </main>
            <MainFooter/>
        </>
    );
};
