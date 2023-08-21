import React, {useEffect, useState} from "react";
import {ParcelsContainer} from "../components/parcel/ParcelsContainer";
import {getParcels} from "../http/parcel";
import {NotificationType, showNotification} from "../store/features/uiSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {selectParcels, setParcels} from "../store/features/parcelSlice";

export const ParcelsPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const parcels = useAppSelector(selectParcels);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchParcels() {
            await getParcels()
                .then((response) => {
                    dispatch(setParcels(response.data));
                })
                .catch((res) => {
                    dispatch(showNotification({message: res.response.data.error, type: NotificationType.ERROR}))
                });
        }

        fetchParcels().then(() => setIsLoading(false));
    }, [dispatch])

    return (
        <>
            <div style={{textAlign: 'center'}}>
                {isLoading && <p>Loading...</p>}
            </div>
            <ParcelsContainer parcels={parcels}/>)
        </>);
};
