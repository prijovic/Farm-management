import React from "react";
import { ParcelOperation } from "../../../../../model/entities/ParcelOperation";
import { Stack, Typography } from "@mui/material";
import { ParcelOperationCard } from "./ParcelOperationCard/ParcelOperationCard";
import { Droppable } from "@hello-pangea/dnd";

export const ParcelOperationsContainerColumn: React.FC<{
  name: string;
  parcelOperations: ParcelOperation[];
}> = ({ name, parcelOperations }) => {
  return (
    <>
      <Typography variant="overline" component="div">
        {name}
      </Typography>
      <Droppable key={name} droppableId={name}>
        {(provided, snapshot) => (
          <Stack
            sx={{
              backgroundColor: (theme) =>
                snapshot.isDraggingOver
                  ? theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800]
                  : undefined,
            }}
            style={{ borderRadius: "4px" }}
            ref={provided.innerRef}
            spacing={2}
          >
            {parcelOperations.map((operation, index) => (
              <ParcelOperationCard
                key={operation.id}
                index={index}
                parcelOperation={operation}
              />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </>
  );
};
