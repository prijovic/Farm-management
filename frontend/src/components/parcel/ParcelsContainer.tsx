import React from "react";
import {ParcelCard} from "./ParcelCard";
import {Button, Divider, Grid, Typography} from "@mui/material";
import {Parcel} from "../../model/entities/Parcel";
import {NavLink} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export const ParcelsContainer: React.FC<{ parcels: Parcel[] }> = ({parcels}) => {
    return (<>
            <Grid item xs={12} sm={6}>
                <Typography variant="h4" component="h1">
                    Your Parcels
                </Typography>
            </Grid>
            <Grid item sm={6} sx={{display: {xs: "none", sm: "inline"}, textAlign: "right"}}>
                <NavLink to={"/parcel/new"}>
                    <Button startIcon={<AddIcon/>} variant={"contained"}>Add Parcel</Button>
                </NavLink>
            </Grid>
            <Grid item xs={12}>
                <Divider orientation={"horizontal"}></Divider>
            </Grid>
            <Grid container className="cards" spacing={2} component={"ul"}>
                {
                    parcels.map(parcel => (
                        <Grid key={parcel.id} item
                              className="card"
                              component="li">
                            <ParcelCard parcel={parcel}/>
                        </Grid>
                    ))
                }
            </Grid>
            <Grid item xs={12} sx={{display: {sm: "none"}, textAlign: "center", marginTop: "2rem"}}>
                <NavLink to={"/parcel/new"}>
                    <Button startIcon={<AddIcon/>} variant={"contained"} fullWidth>Add Parcel</Button>
                </NavLink>
            </Grid>
        </>
    );
};
