import React from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {Parcel} from "../../model/entities/Parcel";
import {toDateOutput} from "../../utils/toDateOutput";
import {Link} from "react-router-dom";

export const ParcelDetailsCard: React.FC<{ parcel: Parcel }> = ({parcel}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {parcel.name}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {parcel.number}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Size: {parcel.size}ha
                </Typography>
                <Typography variant="caption">
                    Created on: {toDateOutput(parcel.creationDate)}
                    <br/>
                    Last edit: {toDateOutput(parcel.lastEditDate)}
                </Typography>
            </CardContent>
            <CardActions style={{justifyContent: "center"}}>
                <Link to={"edit"}>
                    <Button size="small">Edit</Button>
                </Link>
            </CardActions>
        </Card>
    );
};
