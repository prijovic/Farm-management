import React from "react";
import {ParcelCard} from "./ParcelCard";
import {Grid} from "@mui/material";
import {Parcel} from "../../model/entities/Parcel";

export const ParcelsContainer: React.FC<{ parcels: Parcel[] }> = ({parcels}) => {
    return (
        <Grid justifyContent={"center"} container spacing={2}>
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
