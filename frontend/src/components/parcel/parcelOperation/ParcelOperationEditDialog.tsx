import React from "react";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import {ParcelOperationEditForm} from "./ParcelOperationEditForm";

export const ParcelOperationEditDialog: React.FC<{ open: boolean, handleClose: () => void }> = ({
                                                                                                    open,
                                                                                                    handleClose
                                                                                                }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <ParcelOperationEditForm closeDialog={handleClose}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};
