import React from "react";
import {Alert, Snackbar} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {closeNotification, selectNotification} from "../store/features/uiSlice";

export const Notification: React.FC = () => {
    const dispatch = useAppDispatch();
    const notification = useAppSelector(selectNotification);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(closeNotification());
    };

    return (
        <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={!!notification}
                  autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={notification?.type} sx={{width: '100%'}}>
                {notification?.message}
            </Alert>
        </Snackbar>
    );
};
