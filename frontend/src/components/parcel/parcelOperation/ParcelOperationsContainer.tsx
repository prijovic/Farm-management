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
import {
  sendUpdateParcelOperationPositionRequest,
  sendUpdateParcelOperationRequest,
} from "../../../http/parcel";
import {
  setParcelOperations,
  updateParcelOperation,
} from "../../../store/features/parcelSlice";
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
  const plannedOperations = parcelOperations
    .filter((o) => o.status === 0)
    .sort((a, b) => a.index - b.index);
  const inProcessOperations = parcelOperations
    .filter((o) => o.status === 1)
    .sort((a, b) => a.index - b.index);
  const finishedOperations = parcelOperations
    .filter((o) => o.status === 2)
    .sort((a, b) => a.index - b.index);
  const dispatch = useAppDispatch();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId: operationId } = result;

    if (!destination) {
      return;
    }
    const newStatus = decodeColumnName(destination.droppableId);
    const parcelOperation = parcelOperations.find(
      (po) => po.id === operationId,
    );
    const newIndex = destination.index;
    if (parcelOperation) {
      dispatch(
        showNotification({
          message: "Operation status change request has been sent.",
          type: NotificationType.INFO,
        }),
      );
      sendUpdateParcelOperationPositionRequest(parcelOperation.id, {
        status: newStatus,
        index: newIndex,
      })
        .then((response) => {
          dispatch(
            showNotification({
              message: "Successful status change!",
              type: NotificationType.SUCCESS,
            }),
          );
          dispatch(setParcelOperations(response.data));
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
