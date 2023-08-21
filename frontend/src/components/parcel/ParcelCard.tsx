import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import classes from "./ParcelCard.module.css";
import {Parcel} from "../../model/entities/Parcel";
import {toDateOutput} from "../../utils/toDateOutput";

export const ParcelCard: React.FC<{ parcel: Parcel }> = ({parcel}) => {
    console.log(parcel);

    return (
        <Link to={`/parcel/${parcel.id}`}>
            <Card sx={{minWidth: 275}} className={classes.card}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {toDateOutput(parcel.creationDate)}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {parcel.name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {parcel.number}
                    </Typography>
                    <Typography variant="body2">
                        Size: {parcel.size}ha
                    </Typography>
                </CardContent>
            </Card>
        </Link>

    );
};
