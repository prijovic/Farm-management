import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  DialogContentType,
  NotificationType,
  showNotification,
  toggleDialogIsOpened,
} from "../../../store/features/uiSlice";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ParcelOperationsContainer } from "./ParcelOperationsContainer/ParcelOperationsContainer";
import {
  selectParcelOperations,
  setParcelOperations,
} from "../../../store/features/parcelSlice";
import { getParcelOperations } from "../../../http/parcel";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { logout } from "../../../store/features/authSlice";

export const ParcelOperationsLayout: React.FC<{ id: string }> = ({ id }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const parcelOperations = useAppSelector(selectParcelOperations);
  const matches = useMediaQuery(theme.breakpoints.only("sm"));
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchParcelOperations() {
      if (id) {
        await getParcelOperations(id)
          .then((response) => {
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
    }

    fetchParcelOperations().then(() => setIsLoading(false));
  }, [dispatch, id]);

  return (
    <Grid
      item
      xs={12}
      sm={8}
      flexDirection="column"
      sx={{ display: { xs: "flex", sm: "inline" } }}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" component="h2">
            Parcel Operations
          </Typography>
        </Grid>
        <Grid
          item
          sm={6}
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {matches && (
            <Tooltip title={"Add operation"}>
              <IconButton
                color="primary"
                onClick={() =>
                  dispatch(
                    toggleDialogIsOpened(
                      DialogContentType.PARCEL_OPERATION_EDIT,
                    ),
                  )
                }
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
          {!matches && (
            <Button
              startIcon={<AddIcon />}
              variant={"contained"}
              onClick={() =>
                dispatch(
                  toggleDialogIsOpened(DialogContentType.PARCEL_OPERATION_EDIT),
                )
              }
            >
              Add Operation
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} marginTop="1rem" marginBottom="2rem">
        <Divider orientation={"horizontal"}></Divider>
      </Grid>
      <Grid item sm={12} xs={0} component="section">
        <div style={{ textAlign: "center" }}>
          {isLoading && <p>Loading...</p>}
        </div>
        <ParcelOperationsContainer parcelOperations={parcelOperations} />
      </Grid>
    </Grid>
  );
};
