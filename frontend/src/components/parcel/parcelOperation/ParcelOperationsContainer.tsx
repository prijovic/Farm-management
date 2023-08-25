import React from "react";
import { ParcelOperation } from "../../../model/entities/ParcelOperation";
import { Grid } from "@mui/material";
import { useAppDispatch } from "../../../store/hooks";
import { ParcelOperationsContainerColumn } from "./ParcelOperationsContainerColumn";
import { ParcelOperationEditDialog } from "./ParcelOperationEditDialog";
import {
  NotificationType,
  showNotification,
} from "../../../store/features/uiSlice";
import { sendUpdateParcelOperationRequest } from "../../../http/parcel";
import { updateParcelOperation } from "../../../store/features/parcelSlice";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { logout } from "../../../store/features/authSlice";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

const decodeColumnName = (name: string) => {
  switch (name) {
    case "Planned":
      return 0;
    case "In Process":
      return 1;
    case "Finished":
      return 2;
    default:
      return -1;
  }
};

export const ParcelOperationsContainer: React.FC<{
  parcelOperations: ParcelOperation[];
}> = ({ parcelOperations }) => {
  const plannedOperations = parcelOperations.filter((o) => o.status === 0);
  const inProcessOperations = parcelOperations.filter((o) => o.status === 1);
  const finishedOperations = parcelOperations.filter((o) => o.status === 2);
  const dispatch = useAppDispatch();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId: operationId } = result;

    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }

    const newStatus = decodeColumnName(destination.droppableId);
    const parcelOperation = parcelOperations.find(
      (po) => po.id === operationId,
    );
    if (parcelOperation) {
      dispatch(
        showNotification({
          message: "Operation status change request has been sent.",
          type: NotificationType.INFO,
        }),
      );
      sendUpdateParcelOperationRequest(parcelOperation.id, {
        name: parcelOperation.name,
        description: parcelOperation.description,
        status: newStatus,
      })
        .then((response) => {
          dispatch(
            showNotification({
              message: "Successful status change!",
              type: NotificationType.SUCCESS,
            }),
          );
          dispatch(updateParcelOperation(response.data));
        })
        .catch((res) => {
          dispatch(
            showNotification({
              message: getErrorMessage(res),
              type: NotificationType.ERROR,
            }),
          );
        })
        .catch((e) => {
          if (e.message === "Unauthorized") {
            logout();
            dispatch(logout());
          }
        });
    }
  };

  return (
    <>
      <ParcelOperationEditDialog />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <ParcelOperationsContainerColumn
              name={"Planned"}
              parcelOperations={plannedOperations}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ParcelOperationsContainerColumn
              name={"In Process"}
              parcelOperations={inProcessOperations}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ParcelOperationsContainerColumn
              name={"Finished"}
              parcelOperations={finishedOperations}
            />
          </Grid>
        </Grid>
      </DragDropContext>
    </>
  );
};
