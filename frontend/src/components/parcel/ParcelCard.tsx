import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import classes from "./ParcelCard.module.css";
import {Parcel} from "../../model/entities/Parcel";
import {toDateOutput} from "../../utils/toDateOutput";

export const ParcelCard: React.FC<{ parcel: Parcel }> = ({parcel}) => {

    return (
        <Link to={`/parcel/${parcel.id}`}>
            <Card
                sx={{minWidth: {xs: "100%", sm: "200px", md: "300px"}}}
                className={classes.card}>
                <CardContent>
                    <Typography component="span" sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {toDateOutput(parcel.creationDate)}
                    </Typography>
                    <Typography color="secondary" variant="h4" component="h2">
                        {parcel.name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} component="h3" color="text.secondary">
                        {parcel.number}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Size: {parcel.size}ha
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};
