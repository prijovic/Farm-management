import React, {useState} from "react";
import {ParcelOperation} from "../../../model/entities/ParcelOperation";
import {Button, Grid, IconButton, Tooltip} from "@mui/material";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {useAppDispatch} from "../../../store/hooks";
import {updateParcelOperationStatus} from "../../../store/features/parcelSlice";
import {ParcelOperationsContainerColumn} from "./ParcelOperationsContainerColumn";
import AddIcon from '@mui/icons-material/Add';
import {ParcelOperationEditDialog} from "./ParcelOperationEditDialog";

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
    const [dialogIsOpened, setDialogIsOpened] = useState(false);

    const handleDragEnd = (result: DropResult) => {
        const {destination, source, draggableId: operationId} = result;

        if (!destination || destination.droppableId === source.droppableId) {
            return;
        }

        const newStatus = decodeColumnName(destination.droppableId);
        dispatch(updateParcelOperationStatus({id: operationId, status: newStatus}));
    }

    return (
        <>
            <ParcelOperationEditDialog open={dialogIsOpened} handleClose={() => setDialogIsOpened(false)}/>
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
            <Grid sx={{
                display: {sm: "none", xs: "flex"},
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "1rem"
            }} xs={12}>
                <Button fullWidth onClick={() => setDialogIsOpened(true)} color={"primary"} aria-label="create"
                        size="medium">
                    Add Operation
                </Button>
            </Grid>
            <Grid sx={{
                display: {xs: "none", sm: "flex"},
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "1rem"
            }} sm={12}>
                <Tooltip title={"Add Operation"}>
                    <IconButton color={"primary"} onClick={() => setDialogIsOpened(true)} aria-label="create"
                                size="medium">
                        <AddIcon></AddIcon>
                    </IconButton>
                </Tooltip>
            </Grid>
        </>
    );
};
