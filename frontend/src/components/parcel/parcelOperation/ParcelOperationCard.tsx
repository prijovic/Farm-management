import React from "react";
import {ParcelOperation} from "../../../model/entities/ParcelOperation";
import {Card, CardContent, Typography} from "@mui/material";
import {toDateOutput} from "../../../utils/toDateOutput";
import {Draggable} from "react-beautiful-dnd";

export const ParcelOperationCard: React.FC<{ parcelOperation: ParcelOperation, index: number }> = ({
                                                                                                       parcelOperation,
                                                                                                       index
                                                                                                   }) => {
    const statusDisplay = () => {
        switch (parcelOperation.status) {
            case 1:
                return "Started on: " + toDateOutput(parcelOperation.lastEditDate);
            case 2:
                return "Finished on: " + toDateOutput(parcelOperation.lastEditDate);
            default:
                return "Created on: " + toDateOutput(parcelOperation.creationDate);
        }
    }

    return (
        <Draggable draggableId={parcelOperation.id} index={index}>
            {(provided, snapshot) => <Card variant={"outlined"} raised={snapshot.isDragging}
                                           ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <CardContent>
                    <Typography variant="button" component="div" gutterBottom>
                        {parcelOperation.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {parcelOperation.description}
                    </Typography>
                    <Typography variant="caption">
                        {statusDisplay()}
                    </Typography>
                </CardContent>
            </Card>}
        </Draggable>

    );
};
