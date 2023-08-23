import React from "react";
import {ParcelOperation} from "../../../model/entities/ParcelOperation";
import {Stack, Typography} from "@mui/material";
import {ParcelOperationCard} from "./ParcelOperationCard";
import {Droppable} from "react-beautiful-dnd";

export const ParcelOperationsContainerColumn: React.FC<{ name: string, parcelOperations: ParcelOperation[] }> = ({
                                                                                                                     name,
                                                                                                                     parcelOperations
                                                                                                                 }) => {
    return (
        <>
            <Typography variant="overline" component="div">
                {name}
            </Typography>
            <Droppable droppableId={name}>
                {(provided, snapshot) => <Stack
                    style={{backgroundColor: snapshot.isDraggingOver ? "lightgray" : undefined}}
                    ref={provided.innerRef} spacing={2}>
                    {parcelOperations.map((operation, index) => <ParcelOperationCard key={index}
                                                                                     index={index}
                                                                                     parcelOperation={operation}/>)}
                    {provided.placeholder}
                </Stack>}
            </Droppable>
        </>
    );
};
