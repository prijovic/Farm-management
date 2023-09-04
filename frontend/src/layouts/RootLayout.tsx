import React from "react";
import { MainNavbar } from "../components/MainNavbar/MainNavbar";
import { Outlet } from "react-router";
import { Grid } from "@mui/material";
import { MainFooter } from "../components/MainFooter";

export const RootLayout: React.FC = () => {
  return (
    <>
      <MainNavbar />
      <main>
        <Grid justifyContent={"center"} container component="article">
          <Grid
            item
            sx={{ display: { xs: "none", sm: "flex" }, flexGrow: "1" }}
            sm={1}
            lg={2}
          ></Grid>
          <Grid item xs={12} sm={10} lg={8}>
            <Grid container>
              <Outlet />
            </Grid>
          </Grid>
          <Grid
            item
            sx={{ display: { xs: "none", sm: "flex" }, flexGrow: "1" }}
            sm={1}
            lg={2}
          ></Grid>
        </Grid>
      </main>
      <MainFooter />
    </>
  );
};
