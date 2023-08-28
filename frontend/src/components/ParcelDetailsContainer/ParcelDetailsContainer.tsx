import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectParcel } from "../../store/features/parcelSlice";
import { Grid } from "@mui/material";
import { ParcelOperationsLayout } from "./ParcelOperationsLayout/ParcelOperationsLayout";
import { ParcelDetailsLayout } from "./ParcelDetailsLayout/ParcelDetailsLayout";

export const ParcelDetailsContainer: React.FC = () => {
  const { id } = useParams();
  const parcel = useAppSelector(selectParcel(id!));

  return (
    <Grid container spacing={2}>
      {parcel && <ParcelDetailsLayout parcel={parcel} />}
      {id && <ParcelOperationsLayout id={id} />}
    </Grid>
  );
};
