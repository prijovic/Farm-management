import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng, LatLngTuple, Map as LMap } from "leaflet";
import classes from "./ParcelLocationView.module.css";
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
import { DraggableMarker } from "./DraggableMarker";
import { PolygonOverlay } from "./PolygonOverlay";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { Location } from "../../../model/entities/Location";
import { sendUpdateParcelPolygonRequest } from "../../../http/parcel";
import {
  NotificationType,
  showNotification,
  toggleModal2IsOpened,
} from "../../../store/features/uiSlice";
import { updateParcel } from "../../../store/features/parcelSlice";
import { getErrorMessage } from "../../../utils/getErrorMessage";

interface MarkersState {
  markers: JSX.Element[];
  positions: any[];
}

class MarkerFactory {
  private static id = 0;

  public static generateMarker(
    index: number,
    position: [number, number],
    onDrag: (index: number, position: LatLngTuple) => void,
    onDelete: (index: number) => void,
  ) {
    const id = MarkerFactory.id;
    MarkerFactory.id++;
    return (
      <DraggableMarker
        key={id}
        index={index}
        center={position}
        onDrag={onDrag}
        onDelete={onDelete}
      />
    );
  }
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
      updatedMarkers.push(marker(prevState.markers.length, mapCenter));

      const updatedPositions = prevState.positions;
      updatedPositions.push(mapCenter);

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
        if (p instanceof LatLng) {
          return new Location(p["lat"], p["lng"], index);
        }
        return new Location(p[0], p[1], index);
      });
      sendUpdateParcelPolygonRequest(id, { polygon })
        .then((response) => {
          dispatch(
            showNotification({
              message: "Successful location update!",
              type: NotificationType.SUCCESS,
            }),
          );
          dispatch(toggleModal2IsOpened());
          dispatch(updateParcel(response.data));
        })
        .catch((res) => {
          dispatch(
            showNotification({
              message: getErrorMessage(res),
              type: NotificationType.ERROR,
            }),
          );
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
