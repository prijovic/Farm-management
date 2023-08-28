import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectIsAuthenticated } from "../store/features/authSlice";

export const HomePage: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const title = isAuthenticated
    ? "Welcome!"
    : "Start efficiently managing your land";
  const body = isAuthenticated
    ? "Checkout your parcels and operations on them"
    : "Add time management for your land by easily creating a new account";
  const url = isAuthenticated ? "/parcel/all" : "/auth/signUp";
  const buttonText = isAuthenticated ? "Visit parcels" : "Create account";

  return (
    <Grid container spacing={1}>
      <Grid
        xs={8}
        lg={6}
        item
        display={"flex"}
        flexDirection={"column"}
        gap={"2rem"}
      >
        <Typography variant={"h3"} component={"h1"}>
          {title}
        </Typography>
        <Typography variant={"body1"}>{body}</Typography>
        <Link to={url}>
          <Button variant={"contained"}>{buttonText}</Button>
        </Link>
      </Grid>
    </Grid>
  );
};
