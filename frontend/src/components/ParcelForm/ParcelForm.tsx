import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import { InputField } from "../UI/InputField";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  NotificationType,
  showNotification,
} from "../../store/features/uiSlice";
import {
  sendCreateParcelRequest,
  sendDeleteParcelRequest,
  sendUpdateParcelRequest,
} from "../../http/parcel";
import { Parcel } from "../../model/entities/Parcel";
import {
  deleteParcel as deleteParcelAction,
  selectParcel,
  updateParcel,
} from "../../store/features/parcelSlice";
import { getErrorMessage } from "../../utils/getErrorMessage";
import DeleteIcon from "@mui/icons-material/Delete";

export const ParcelForm: React.FC = () => {
  const { id } = useParams();
  const [parcel, setParcel] = useState<Parcel | undefined>(
    useAppSelector(selectParcel(id)),
  );

  const title = id ? "Parcel Edit" : "New Parcel";
  const subheader = id ? "" : "Please fill out information to add new parcel.";
  const buttonText = id ? "Save Changes" : "Add Parcel";

  const [name, setName] = useState("");
  const nameValidator = {
    [`Name can only contain as least 2 characters or numbers and spaces`]:
      /^(?=.*[a-zA-Z])[a-zA-Z\s0-9]{2,}$/,
  };
  const [nameIsValid, setNameIsValid] = useState(false);

  const [number, setNumber] = useState(1);
  const numberValidator = {
    [`Size must be larger than 0`]: /^[1-9]\d*$/,
  };
  const [numberIsValid, setNumberIsValid] = useState(false);

  const [size, setSize] = useState(0);
  const sizeValidator = {
    [`Size must be larger than 0`]: /^\d*\.?\d*$/,
  };
  const [sizeIsValid, setSizeIsValid] = useState(false);

  const formIsValid: boolean =
    (nameIsValid && numberIsValid && sizeIsValid && !id) ||
    ((name !== parcel?.name ||
      number != parcel.number ||
      size != parcel.size) &&
      !!id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (parcel) {
      setName(parcel.name);
      setSize(parcel.size);
      setNumber(parcel.number);
    }
  }, [parcel]);

  const handleFormSubmit: React.FormEventHandler = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (formIsValid) {
      const body = {
        name,
        size,
        number,
      };
      if (id) {
        dispatch(
          showNotification({
            message: "Saving parcel changes...",
            type: NotificationType.INFO,
          }),
        );
        sendUpdateParcelRequest(id, body)
          .then((response) => {
            dispatch(
              showNotification({
                message: "Successful parcel update!",
                type: NotificationType.SUCCESS,
              }),
            );
            dispatch(updateParcel(response.data));
            navigate("/parcel/" + id, { replace: true });
          })
          .catch((res) => {
            const message = getErrorMessage(res);
            if (message) {
              dispatch(
                showNotification({
                  message: message,
                  type: NotificationType.ERROR,
                }),
              );
            }
          });
      } else {
        dispatch(
          showNotification({
            message: "Parcel creation request has been sent.",
            type: NotificationType.INFO,
          }),
        );
        sendCreateParcelRequest(body)
          .then(() => {
            dispatch(
              showNotification({
                message: "Successful parcel creation!",
                type: NotificationType.SUCCESS,
              }),
            );
            navigate("/parcel/all", { replace: true });
          })
          .catch((res) => {
            const message = getErrorMessage(res);
            if (message) {
              dispatch(
                showNotification({
                  message: message,
                  type: NotificationType.ERROR,
                }),
              );
            }
          });
      }
    }
  };

  const deleteParcel = () => {
    if (id) {
      dispatch(
        showNotification({
          message: "Parcel deletion request has been sent.",
          type: NotificationType.INFO,
        }),
      );
      sendDeleteParcelRequest(id)
        .then((response) => {
          dispatch(
            showNotification({
              message: "Successful parcel deletion!",
              type: NotificationType.SUCCESS,
            }),
          );
          dispatch(deleteParcelAction(response.data));
          navigate("/parcel/all", { replace: true });
        })
        .catch((res) => {
          const message = getErrorMessage(res);
          if (message) {
            dispatch(
              showNotification({
                message: message,
                type: NotificationType.ERROR,
              }),
            );
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
                validators={nameValidator}
                onValidityChange={(isValid) => setNameIsValid(isValid)}
              />
              <InputField
                label={"Number"}
                type={"number"}
                id={"number"}
                value={number}
                onChange={(event) => setNumber(event)}
                required={true}
                inputProps={{ inputMode: "numeric" }}
                validators={numberValidator}
                onValidityChange={(isValid) => {
                  setNumberIsValid(isValid);
                }}
              />
              <InputField
                label={"Size"}
                type={"number"}
                id={"size"}
                value={size}
                onChange={(event) => setSize(event)}
                required={true}
                inputProps={{ inputMode: "numeric", pattern: "[1-9][0-9]*" }}
                validators={sizeValidator}
                onValidityChange={(isValid) => {
                  setSizeIsValid(isValid);
                }}
              />
            </Stack>
          </Stack>
        </CardContent>
        <CardActions
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
          style={{ justifyContent: "center", marginTop: "2rem", gap: "1rem" }}
        >
          <Button
            disabled={!formIsValid && !!id}
            size={"large"}
            type="submit"
            sx={{ width: { xs: "100%", sm: "fit-content" } }}
            variant={"contained"}
          >
            {buttonText}
          </Button>
          {id && (
            <Button
              size={"large"}
              type="button"
              onClick={deleteParcel}
              sx={{
                width: { xs: "100%", sm: "fit-content" },
                marginLeft: { xs: "0 !important", sm: "inherit" },
              }}
              variant={"contained"}
              color={"error"}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          )}
        </CardActions>
      </form>
    </Card>
  );
};
