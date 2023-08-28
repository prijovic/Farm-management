import React from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { ParcelOperationEditForm } from "./ParcelOperationEditForm/ParcelOperationEditForm";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  DialogContentType,
  selectDialogContentType,
  selectDialogIsOpened,
  toggleDialogIsOpened,
} from "../../../../../store/features/uiSlice";
import { setParcelOperationId } from "../../../../../store/features/parcelSlice";

export const ParcelOperationEditDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const dialogIsOpened = useAppSelector(selectDialogIsOpened);
  const dialogContentType = useAppSelector(selectDialogContentType);

  const handleDialogClose = () => {
    dispatch(toggleDialogIsOpened(dialogContentType));
    dispatch(setParcelOperationId(null));
  };

  return (
    <Dialog
      scroll={"body"}
      open={
        dialogContentType === DialogContentType.PARCEL_OPERATION_EDIT &&
        dialogIsOpened
      }
      onClose={handleDialogClose}
    >
      <DialogContent>
        <ParcelOperationEditForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
