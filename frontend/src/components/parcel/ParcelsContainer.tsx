import React from "react";
import {ParcelCard} from "./ParcelCard";
import {Button, Grid, Typography} from "@mui/material";
import {Parcel} from "../../model/entities/Parcel";
import {NavLink} from "react-router-dom";

export const ParcelsContainer: React.FC<{ parcels: Parcel[] }> = ({parcels}) => {
    return (
        <Grid justifyContent={"center"} container spacing={2}>
            <Grid item xs={6} textAlign={"center"}>
                <Typography variant="h4" component="div">
                    Your Parcels
                </Typography>
            </Grid>
            <Grid item xs={6} textAlign={"center"}>
                <NavLink to={"/parcel/new"}>
                    <Button variant={"contained"}>Add Parcel</Button>
                </NavLink>
            </Grid>
            {
                parcels.map(parcel => (
                    <Grid key={parcel.id} item>
                        <ParcelCard parcel={parcel}/>
                    </Grid>
                ))
            }
        </Grid>
    );
};
