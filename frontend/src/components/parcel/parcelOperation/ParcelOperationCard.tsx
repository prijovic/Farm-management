import React from "react";
import {ParcelOperation} from "../../../model/entities/ParcelOperation";
import {Card, CardContent, Grid, IconButton, Typography} from "@mui/material";
import {toDateOutput} from "../../../utils/toDateOutput";
import {Draggable} from "react-beautiful-dnd";
import EditIcon from '@mui/icons-material/Edit';
import classes from "./ParcelOperationCard.module.css";
import {useAppDispatch} from "../../../store/hooks";
import {toggleModalIsOpened} from "../../../store/features/uiSlice";
import {setParcelOperationId} from "../../../store/features/parcelSlice";

export const ParcelOperationCard: React.FC<{ parcelOperation: ParcelOperation, index: number }> = ({
                                                                                                       parcelOperation,
                                                                                                       index
                                                                                                   }) => {
    const dispatch = useAppDispatch();

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

    const startEdit = () => {
        dispatch(setParcelOperationId(parcelOperation.id));
        dispatch(toggleModalIsOpened());
    }

    return (
        <Draggable draggableId={parcelOperation.id} index={index}>
            {(provided, snapshot) => <Card className={classes.card}
                                           variant={snapshot.isDragging ? "elevation" : "outlined"}
                                           raised={snapshot.isDragging}
                                           ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography color={"secondary"} variant="button" component="div" gutterBottom>
                                {parcelOperation.name}
                            </Typography>
                        </Grid>
                        <Grid className={classes.editButton} textAlign={"right"} item xs={2}>
                            <IconButton onClick={startEdit} color={"primary"}
                                        aria-label="edit" size="small">
                                <EditIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>

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
