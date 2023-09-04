import React from "react";
import { Grid } from "@mui/material";
import { ParcelDetailsCard } from "./ParcelDetailsCard/ParcelDetailsCard";
import { ParcelLocationView } from "./ParcelLocationView/ParcelLocationView";
import { Parcel } from "../../../model/entities/Parcel";

export const ParcelDetailsLayout: React.FC<{ parcel: Parcel }> = ({
  parcel,
}) => {
  return (
    <Grid
      item
      sm={4}
      xs={12}
      display="flex"
      gap="1rem"
      flexDirection="column"
      alignItems="flex-end"
      component="section"
    >
      <ParcelDetailsCard parcel={parcel} />
      <ParcelLocationView polygon={parcel.polygon} />
    </Grid>
  );
};
