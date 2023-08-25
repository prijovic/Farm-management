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
import { ParcelDetailsCard } from "../components/parcel/ParcelDetailsCard";
import { ParcelOperationsContainer } from "../components/parcel/parcelOperation/ParcelOperationsContainer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectParcel,
  selectParcelOperations,
  setParcelOperations,
} from "../store/features/parcelSlice";
import { useParams } from "react-router-dom";
import { getParcelOperations } from "../http/parcel";
import {
  NotificationType,
  showNotification,
  toggleModalIsOpened,
} from "../store/features/uiSlice";
import { getErrorMessage } from "../utils/getErrorMessage";
import { logout } from "../store/features/authSlice";
import AddIcon from "@mui/icons-material/Add";
import { ParcelLocationView } from "../components/parcel/parcelLocation/ParcelLocationView";

export const ParcelDetailsPage: React.FC = () => {
  const { id } = useParams();
  const parcel = useAppSelector(selectParcel(id!));
  const [isLoading, setIsLoading] = useState(false);
  const parcelOperations = useAppSelector(selectParcelOperations);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.only("sm"));

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
    <Grid container spacing={2}>
      <Grid
        item
        sm={4}
        xs={12}
        display="flex"
        gap="1rem"
        flexDirection="column"
        alignItems="flex-end"
        component="section"
      >
        {parcel && <ParcelDetailsCard parcel={parcel} />}
        {parcel && <ParcelLocationView polygon={parcel.polygon} />}
      </Grid>
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
                  onClick={() => dispatch(toggleModalIsOpened())}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
            {!matches && (
              <Button
                startIcon={<AddIcon />}
                variant={"contained"}
                onClick={() => dispatch(toggleModalIsOpened())}
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
    </Grid>
  );
};
