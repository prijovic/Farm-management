import React from "react";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import {ParcelOperationEditForm} from "./ParcelOperationEditForm";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {selectModalIsOpened, toggleModalIsOpened} from "../../../store/features/uiSlice";

export const ParcelOperationEditDialog: React.FC = () => {
    const dispatch = useAppDispatch();
    const modalIsOpened = useAppSelector(selectModalIsOpened);

    return (
        <Dialog open={modalIsOpened} onClose={() => dispatch(toggleModalIsOpened())}>
            <DialogContent>
                <ParcelOperationEditForm/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(toggleModalIsOpened())}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};
