import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  DialogContentType,
  selectDialogContentType,
  selectDialogIsOpened,
  toggleDialogIsOpened,
} from "../../../../../store/features/uiSlice";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { ParcelLocationEditForm } from "./ParcelLocationEditForm/ParcelLocationEditForm";
import { LatLngTuple } from "leaflet";
import { Location } from "../../../../../model/entities/Location";

export const ParcelLocationEditDialog: React.FC<{
  polygon: Location[];
  center: LatLngTuple;
}> = ({ center, polygon }) => {
  const dispatch = useAppDispatch();
  const dialogIsOpened = useAppSelector(selectDialogIsOpened);
  const dialogContentType = useAppSelector(selectDialogContentType);

  return (
    <Dialog
      scroll={"body"}
      open={
        dialogContentType === DialogContentType.PARCEL_LOCATION_EDIT &&
        dialogIsOpened
      }
      onClose={() =>
        dispatch(toggleDialogIsOpened(DialogContentType.PARCEL_LOCATION_EDIT))
      }
    >
      <DialogContent>
        <ParcelLocationEditForm polygon={polygon} center={center} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            dispatch(
              toggleDialogIsOpened(DialogContentType.PARCEL_LOCATION_EDIT),
            )
          }
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
