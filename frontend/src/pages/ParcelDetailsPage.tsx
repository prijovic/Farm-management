import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {ParcelDetailsCard} from "../components/parcel/ParcelDetailsCard";
import {ParcelOperationsContainer} from "../components/parcel/parcelOperation/ParcelOperationsContainer";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {selectParcel, selectParcelOperations, setParcelOperations} from "../store/features/parcelSlice";
import {useParams} from "react-router-dom";
import {getParcelOperations} from "../http/parcel";
import {NotificationType, showNotification} from "../store/features/uiSlice";

export const ParcelDetailsPage: React.FC = () => {
    const {id} = useParams();
    const parcel = useAppSelector(selectParcel(id!));
    const [isLoading, setIsLoading] = useState(false);
    const parcelOperations = useAppSelector(selectParcelOperations);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchParcelOperations() {
            if (id) {
                await getParcelOperations(id)
                    .then((response) => {
                        dispatch(setParcelOperations(response.data));
                    })
                    .catch((res) => {
                        dispatch(showNotification({message: res.response.data.error, type: NotificationType.ERROR}))
                    });
            }

        }

        fetchParcelOperations().then(() => setIsLoading(false));
    }, [dispatch, id])

    return (
        <>
            <Grid style={{paddingInline: "3rem"}} container spacing={2}>
                <Grid item sm={4} xs={12}>
                    {parcel && <ParcelDetailsCard parcel={parcel}/>}
                </Grid>
                <Grid item sm={8} xs={0}>
                    <div style={{textAlign: 'center'}}>
                        {isLoading && <p>Loading...</p>}
                    </div>
                    <ParcelOperationsContainer parcelOperations={parcelOperations}/>
                </Grid>
            </Grid>
        </>

    );
};
