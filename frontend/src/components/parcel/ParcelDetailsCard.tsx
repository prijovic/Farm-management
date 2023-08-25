import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Parcel } from "../../model/entities/Parcel";
import { toDateOutput } from "../../utils/toDateOutput";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export const ParcelDetailsCard: React.FC<{ parcel: Parcel }> = ({ parcel }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "fit-content",
        maxWidth: { xs: "100%", sm: "400px" },
        minWidth: { xs: "100%" },
      }}
    >
      <CardContent>
        <Typography variant="h4" component="h1">
          {parcel.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" component="h2">
          {parcel.number}
        </Typography>
        <Typography sx={{ mb: 3 }} variant="body1" gutterBottom component="p">
          Size: {parcel.size}ha
        </Typography>
        <Typography variant="caption" component="span">
          Created on: {toDateOutput(parcel.creationDate)}
          <br />
          Last edit: {toDateOutput(parcel.lastEditDate)}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center", marginTop: "auto" }}>
        <Link to={"edit"} style={{ width: "100%" }}>
          <Button
            sx={{ width: { xs: "100% !important", sm: "fit-content" } }}
            size="small"
            variant={"outlined"}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
