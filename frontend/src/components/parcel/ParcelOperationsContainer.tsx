import React from "react";
import {ParcelOperation} from "../../model/entities/ParcelOperation";
import {Grid} from "@mui/material";
import {ParcelOperationsContainerColumn} from "./ParcelOperationsContainerColumn";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {useAppDispatch} from "../../store/hooks";
import {updateParcelOperationStatus} from "../../store/features/parcelSlice";

const decodeColumnName = (name: string) => {
    switch (name) {
        case 'Planned':
            return 0;
        case 'In Process':
            return 1;
        case 'Finished':
            return 2
        default:
            return -1;
    }
}

export const ParcelOperationsContainer: React.FC<{ parcelOperations: ParcelOperation[] }> = ({parcelOperations}) => {
    const plannedOperations = parcelOperations.filter(o => o.status === 0);
    const inProcessOperations = parcelOperations.filter(o => o.status === 1);
    const finishedOperations = parcelOperations.filter(o => o.status === 2);
    const dispatch = useAppDispatch();

    const handleDragEnd = (result: DropResult) => {
        const {destination, source, draggableId: operationId} = result;

        if (!destination || destination.droppableId === source.droppableId) {
            return;
        }

        const newStatus = decodeColumnName(destination.droppableId);
        dispatch(updateParcelOperationStatus({id: operationId, status: newStatus}));
    }

    return (
        <DragDropContext
            onDragEnd={handleDragEnd}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <ParcelOperationsContainerColumn name={"Planned"} parcelOperations={plannedOperations}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ParcelOperationsContainerColumn name={"In Process"} parcelOperations={inProcessOperations}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ParcelOperationsContainerColumn name={"Finished"} parcelOperations={finishedOperations}/>
                </Grid>
            </Grid>
        </DragDropContext>
    );
};
