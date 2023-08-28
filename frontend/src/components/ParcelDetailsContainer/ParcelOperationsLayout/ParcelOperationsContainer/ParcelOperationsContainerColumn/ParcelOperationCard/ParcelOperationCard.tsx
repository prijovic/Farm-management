import React from "react";
import { ParcelOperation } from "../../../../../../model/entities/ParcelOperation";
import { Card, CardContent, Typography } from "@mui/material";
import { toDateOutput } from "../../../../../../utils/toDateOutput";
import { useAppDispatch } from "../../../../../../store/hooks";
import { setParcelOperationId } from "../../../../../../store/features/parcelSlice";
import { Draggable } from "@hello-pangea/dnd";
import {
  DialogContentType,
  toggleDialogIsOpened,
} from "../../../../../../store/features/uiSlice";

export const ParcelOperationCard: React.FC<{
  parcelOperation: ParcelOperation;
  index: number;
}> = ({ parcelOperation, index }) => {
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
  };

  const startEdit = () => {
    dispatch(setParcelOperationId(parcelOperation.id));
    dispatch(toggleDialogIsOpened(DialogContentType.PARCEL_OPERATION_EDIT));
  };

  return (
    <Draggable draggableId={parcelOperation.id} key={index} index={index}>
      {(provided, snapshot) => (
        <Card
          key={index}
          variant={snapshot.isDragging ? "elevation" : "outlined"}
          raised={snapshot.isDragging}
          onClick={() => (!snapshot.isDragging ? startEdit() : undefined)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardContent>
            <Typography
              color={"secondary"}
              variant="button"
              component="div"
              gutterBottom
            >
              {parcelOperation.name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {parcelOperation.description}
            </Typography>
            <Typography variant="caption">{statusDisplay()}</Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};
