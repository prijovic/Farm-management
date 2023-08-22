import React from "react";
import {Grid} from "@mui/material";
import {ParcelDetailsCard} from "../components/parcel/ParcelDetailsCard";
import {ParcelOperationsContainer} from "../components/parcel/ParcelOperationsContainer";
import {useAppSelector} from "../store/hooks";
import {selectParcel} from "../store/features/parcelSlice";
import {useParams} from "react-router-dom";

export const ParcelDetailsPage: React.FC = () => {
    const {id} = useParams();
    const parcel = useAppSelector(selectParcel(id!));

    return (
        <>
            <Grid style={{paddingInline: "3rem"}} container spacing={2}>
                <Grid item sm={4} xs={12}>
                    {parcel && <ParcelDetailsCard parcel={parcel}/>}
                </Grid>
                <Grid item sm={8} xs={0}>
                    <ParcelOperationsContainer/>
                </Grid>
            </Grid>
        </>

    );
};
