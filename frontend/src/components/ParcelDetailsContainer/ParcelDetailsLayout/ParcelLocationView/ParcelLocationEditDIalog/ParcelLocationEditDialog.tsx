import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  selectModal2IsOpened,
  toggleModal2IsOpened,
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
  const modalIsOpened = useAppSelector(selectModal2IsOpened);

  return (
    <Dialog
      scroll={"body"}
      open={modalIsOpened}
      onClose={() => dispatch(toggleModal2IsOpened())}
    >
      <DialogContent>
        <ParcelLocationEditForm polygon={polygon} center={center} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(toggleModal2IsOpened())}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
