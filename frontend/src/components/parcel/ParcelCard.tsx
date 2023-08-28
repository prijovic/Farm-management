import React from "react";
import { Card, CardContent, Grid, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./ParcelCard.module.css";
import { Parcel } from "../../model/entities/Parcel";
import { toDateOutput } from "../../utils/toDateOutput";
import { EventAvailable, Event, EventRepeat } from "@mui/icons-material";

export const ParcelCard: React.FC<{ parcel: Parcel }> = ({ parcel }) => {
  return (
    <Link to={`/parcel/${parcel.id}`}>
      <Card
        sx={{ minWidth: { xs: "100%", sm: "200px", md: "300px" } }}
        className={classes.card}
      >
        <CardContent>
          <Typography
            component="span"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {toDateOutput(parcel.creationDate)}
          </Typography>
          <Typography color="secondary" variant="h4" component="h2">
            {parcel.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} component="h3" color="text.secondary">
            {parcel.number}
          </Typography>
          <Typography variant="body2" component="p" marginBottom={"2rem"}>
            Size: {parcel.size}ha
          </Typography>
          <Grid container>
            <Tooltip title={"Planned operations"}>
              <Grid item xs={4} display={"flex"} alignItems={"center"}>
                <Event />
                <Typography marginLeft={"0.5rem"} component={"span"}>
                  {parcel.plannedOperations}
                </Typography>
              </Grid>
            </Tooltip>
            <Tooltip title={"Operations in process"}>
              <Grid
                item
                xs={4}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <EventRepeat color={"primary"} />
                <Typography
                  marginLeft={"0.5rem"}
                  color={"success"}
                  component={"span"}
                >
                  {parcel.inProgressOperations}
                </Typography>
              </Grid>
            </Tooltip>
            <Tooltip title={"Finished operations"}>
              <Grid
                item
                xs={4}
                display={"flex"}
                justifyContent={"right"}
                alignItems={"center"}
              >
                <EventAvailable color={"success"} />
                <Typography
                  marginLeft={"0.5rem"}
                  color={"success"}
                  component={"span"}
                >
                  {parcel.finishedOperations}
                </Typography>
              </Grid>
            </Tooltip>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
};
