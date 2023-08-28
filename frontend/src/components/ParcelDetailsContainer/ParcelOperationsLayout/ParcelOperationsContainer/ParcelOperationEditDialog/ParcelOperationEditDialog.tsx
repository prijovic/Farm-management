import React from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { ParcelOperationEditForm } from "./ParcelOperationEditForm/ParcelOperationEditForm";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  selectModalIsOpened,
  toggleModalIsOpened,
} from "../../../../../store/features/uiSlice";
import { setParcelOperationId } from "../../../../../store/features/parcelSlice";

export const ParcelOperationEditDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const modalIsOpened = useAppSelector(selectModalIsOpened);

  const handleDialogClose = () => {
    dispatch(toggleModalIsOpened());
    dispatch(setParcelOperationId(null));
  };

  return (
    <Dialog scroll={"body"} open={modalIsOpened} onClose={handleDialogClose}>
      <DialogContent>
        <ParcelOperationEditForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
