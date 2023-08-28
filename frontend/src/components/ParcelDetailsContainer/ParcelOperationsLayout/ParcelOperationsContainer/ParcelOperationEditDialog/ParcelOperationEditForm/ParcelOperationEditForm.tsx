import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import { InputField } from "../../../../../UI/InputField";
import {
  sendCreateParcelOperationRequest,
  sendDeleteParcelOperationRequest,
  sendUpdateParcelOperationRequest,
} from "../../../../../../http/parcel";
import { useParams } from "react-router-dom";
import {
  NotificationType,
  showNotification,
  toggleModalIsOpened,
} from "../../../../../../store/features/uiSlice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import {
  addParcelOperation,
  deleteParcelOperation as deleteParcelOperationAction,
  selectParcelOperation,
  updateParcelOperation,
} from "../../../../../../store/features/parcelSlice";
import { getErrorMessage } from "../../../../../../utils/getErrorMessage";
import { logout } from "../../../../../../store/features/authSlice";
import DeleteIcon from "@mui/icons-material/Delete";

export const ParcelOperationEditForm: React.FC = () => {
  const { id: parcelId } = useParams();
  const parcelOperation = useAppSelector(selectParcelOperation);
  const title = parcelOperation ? "Edit Operation" : "New Operation";
  const subheader = parcelOperation
    ? ""
    : "Please fill out information to add new operation";
  const buttonText = parcelOperation ? "Save Changes" : "Add Operation";
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const validator = (fieldName: string) => {
    return {
      [`${fieldName} can only contain as least 2 characters or numbers and spaces`]:
        /^(?=.*[a-zA-Z])[a-zA-Z\s0-9]{2,}$/,
    };
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (parcelOperation) {
      setName(parcelOperation.name);
      setDescription(parcelOperation.description);
    }
  }, [parcelOperation]);

  const formIsValid: boolean =
    (nameIsValid && descriptionIsValid && !parcelOperation) ||
    (!!parcelOperation &&
      ((name !== parcelOperation.name &&
        nameIsValid &&
        (description === parcelOperation.description || descriptionIsValid)) ||
        (description !== parcelOperation.description &&
          descriptionIsValid &&
          (name === parcelOperation.name || nameIsValid))));

  const handleFormSubmit: React.FormEventHandler = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (formIsValid) {
      if (parcelId) {
        if (!parcelOperation) {
          dispatch(
            showNotification({
              message: "Operation creation request has been sent.",
              type: NotificationType.INFO,
            }),
          );
          dispatch(toggleModalIsOpened());
          sendCreateParcelOperationRequest(parcelId, {
            name,
            description,
          })
            .then((response) => {
              dispatch(
                showNotification({
                  message: "Successful operation creation!",
                  type: NotificationType.SUCCESS,
                }),
              );
              dispatch(addParcelOperation(response.data));
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
        } else {
          dispatch(
            showNotification({
              message: "Operation update request has been sent.",
              type: NotificationType.INFO,
            }),
          );
          dispatch(toggleModalIsOpened());
          sendUpdateParcelOperationRequest(parcelOperation.id, {
            name,
            description,
          })
            .then((response) => {
              dispatch(
                showNotification({
                  message: "Successful operation update!",
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
      }
    }
  };

  const deleteParcelOperation = () => {
    if (parcelOperation) {
      dispatch(toggleModalIsOpened());
      dispatch(
        showNotification({
          message: "Operation deletion request has been sent.",
          type: NotificationType.INFO,
        }),
      );
      sendDeleteParcelOperationRequest(parcelOperation.id)
        .then((response) => {
          dispatch(
            showNotification({
              message: "Successful operation deletion!",
              type: NotificationType.SUCCESS,
            }),
          );
          dispatch(deleteParcelOperationAction(response.data));
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
    <Card className={"form"} sx={{ maxWidth: { xs: "80%", sm: "500px" } }}>
      <CardHeader
        title={title}
        titleTypographyProps={{ component: "h1", variant: "h4" }}
        subheader={subheader}
        subheaderTypographyProps={{
          component: "p",
          variant: "subtitle1",
          gutterBottom: true,
        }}
      />
      <form onSubmit={handleFormSubmit}>
        <CardContent>
          <Stack spacing={6}>
            <Stack spacing={2} direction={"column"}>
              <InputField
                label={"Name"}
                type={"text"}
                id={"name"}
                value={name}
                onChange={(event) => setName(event)}
                required={true}
                validators={validator("Name")}
                onValidityChange={(isValid) => setNameIsValid(isValid)}
              />
              <InputField
                label={"Description"}
                type={"text"}
                id={"description"}
                value={description}
                onChange={(event) => setDescription(event)}
                required={true}
                validators={validator("Description")}
                multiline={true}
                rows={4}
                onValidityChange={(isValid) => setDescriptionIsValid(isValid)}
              />
            </Stack>
          </Stack>
        </CardContent>
        <CardActions
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
          style={{ justifyContent: "center", marginTop: "2rem", gap: "1rem" }}
        >
          <Button
            disabled={!formIsValid && !!parcelOperation}
            size={"large"}
            type="submit"
            sx={{ width: { xs: "100%", sm: "fit-content" } }}
            variant={"contained"}
          >
            {buttonText}
          </Button>
          {parcelOperation && (
            <Button
              size={"large"}
              type="button"
              onClick={deleteParcelOperation}
              sx={{
                width: { xs: "100%", sm: "fit-content" },
                marginLeft: { xs: "0 !important", sm: "inherit" },
              }}
              variant={"contained"}
              startIcon={<DeleteIcon />}
              color={"error"}
            >
              Delete
            </Button>
          )}
        </CardActions>
      </form>
    </Card>
  );
};
