import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng, LatLngTuple, Map as LMap } from "leaflet";
import classes from "../../ParcelLocationView.module.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MarkerFactory } from "./DraggableMarker/DraggableMarker";
import { PolygonOverlay } from "../../PolygonOverlay/PolygonOverlay";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../../../store/hooks";
import { Location } from "../../../../../../model/entities/Location";
import { sendUpdateParcelPolygonRequest } from "../../../../../../http/parcel";
import {
  DialogContentType,
  NotificationType,
  showNotification,
  toggleDialogIsOpened,
} from "../../../../../../store/features/uiSlice";
import { updateParcel } from "../../../../../../store/features/parcelSlice";
import { getErrorMessage } from "../../../../../../utils/getErrorMessage";

interface MarkersState {
  markers: JSX.Element[];
  positions: any[];
}

export const ParcelLocationEditForm: React.FC<{
  polygon: Location[];
  center: LatLngTuple;
}> = ({ center, polygon }) => {
  const { id } = useParams();
  const [markerPositions, setMarkerPositions] = useState<MarkersState>({
    markers: [],
    positions: [],
  });
  const mapRef = useRef<LMap>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updatedMarkers: JSX.Element[] = [];
    const updatedPositions: any[] = [];
    polygon.forEach((location, index) => {
      const position: [number, number] = [
        location.latitude,
        location.longitude,
      ];
      updatedPositions[index] = position;
      updatedMarkers[index] = marker(index, position);
    });
    setMarkerPositions({
      markers: updatedMarkers,
      positions: updatedPositions,
    });
  }, [polygon]);

  const positionToLatLngTuple = useCallback((position: any): LatLngTuple => {
    if (position instanceof LatLng) {
      return [position["lat"], position["lng"]];
    } else {
      return [position[0], position[1]];
    }
  }, []);

  const handleAddMarker = () => {
    let mapCenter = center;
    if (mapRef && mapRef.current) {
      mapCenter = [
        mapRef.current.getCenter().lat,
        mapRef.current.getCenter().lng,
      ];
    }
    setMarkerPositions((prevState) => {
      const updatedMarkers = prevState.markers;
      let center = mapCenter;
      if (updatedMarkers.length > 2) {
        const lastPosition =
          prevState.positions[prevState.positions.length - 1];
        const lastPositionLatLng = positionToLatLngTuple(lastPosition);
        const firstPosition = prevState.positions[0];
        const firstPositionLatLng = positionToLatLngTuple(firstPosition);
        center = [
          (lastPositionLatLng[0] + firstPositionLatLng[0]) / 2,
          (lastPositionLatLng[1] + firstPositionLatLng[1]) / 2,
        ];
      }
      updatedMarkers.push(marker(prevState.markers.length, center));

      const updatedPositions = prevState.positions;
      updatedPositions.push(center);

      return {
        markers: updatedMarkers,
        positions: updatedPositions,
      };
    });
  };

  const handleMarkerDrag = (index: number, position: LatLngTuple) => {
    setMarkerPositions((prevState) => {
      const updatedPositions = prevState.positions.map((p, i) => {
        if (i === index) {
          return position;
        }
        return p;
      });
      return {
        markers: prevState.markers,
        positions: updatedPositions,
      };
    });
  };

  const handleMarkerDelete = (index: number) => {
    setMarkerPositions((prevState) => {
      const updatedPositions = prevState.positions;
      updatedPositions.splice(index, 1);
      const updatedMarkers = updatedPositions.map((p, i) => marker(i, p));

      return {
        markers: updatedMarkers,
        positions: updatedPositions,
      };
    });
  };

  const marker = (index: number, position: [number, number]) => {
    return MarkerFactory.generateMarker(
      index,
      position,
      handleMarkerDrag,
      handleMarkerDelete,
    );
  };

  const handleClickSave = () => {
    if (id && markerPositions.positions.length > 2) {
      const polygon = markerPositions.positions.map((p, index) => {
        const locationLatLng = positionToLatLngTuple(p);
        return new Location(locationLatLng[0], locationLatLng[1], index);
      });
      sendUpdateParcelPolygonRequest(id, { polygon })
        .then((response) => {
          dispatch(
            showNotification({
              message: "Successful location update!",
              type: NotificationType.SUCCESS,
            }),
          );
          dispatch(
            toggleDialogIsOpened(DialogContentType.PARCEL_LOCATION_EDIT),
          );
          dispatch(updateParcel(response.data));
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
        title="Parcel Location Edit"
        titleTypographyProps={{ component: "h1", variant: "h4" }}
      />
      <CardContent>
        <MapContainer
          ref={mapRef}
          center={center}
          zoom={13}
          className={`${classes.map} ${classes.form}`}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <div className={"leaflet-top leaflet-right"}>
            <div className="leaflet-control">
              <Tooltip title={"Add marker"}>
                <IconButton
                  onClick={handleAddMarker}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.common.white
                        : theme.palette.common.black,
                  }}
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <PolygonOverlay positions={markerPositions.positions} />
          {markerPositions.markers.map((e) => e)}
        </MapContainer>
      </CardContent>
      <CardActions
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
        style={{ justifyContent: "center", marginTop: "2rem", gap: "1rem" }}
      >
        <Button
          size={"large"}
          type="submit"
          sx={{ width: { xs: "100%", sm: "fit-content" } }}
          variant={"contained"}
          onClick={handleClickSave}
        >
          {"Save Changes"}
        </Button>
      </CardActions>
    </Card>
  );
};
