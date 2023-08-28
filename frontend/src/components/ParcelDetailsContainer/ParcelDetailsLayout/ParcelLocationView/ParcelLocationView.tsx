import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import classes from "./ParcelLocationView.module.css";
import { Location } from "../../../../model/entities/Location";
import { LatLngTuple } from "leaflet";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ParcelLocationEditDialog } from "./ParcelLocationEditDIalog/ParcelLocationEditDialog";
import { useAppDispatch } from "../../../../store/hooks";
import {
  DialogContentType,
  toggleDialogIsOpened,
} from "../../../../store/features/uiSlice";
import { PolygonOverlay } from "./PolygonOverlay/PolygonOverlay";

export const ParcelLocationView: React.FC<{ polygon: Location[] }> = ({
  polygon,
}) => {
  const theme = useTheme();

  const positions: LatLngTuple[] =
    polygon && polygon.length > 2
      ? polygon.map((l) => [l.latitude, l.longitude])
      : [];
  const center: LatLngTuple =
    positions.length < 3 ? [45.25477, 19.84079] : calculatePolygonCenter();
  const dispatch = useAppDispatch();

  function calculatePolygonCenter(): LatLngTuple {
    let totalLatitude = 0;
    let totalLongitude = 0;

    for (let i = 0; i < positions.length; i++) {
      totalLatitude += positions[i][0];
      totalLongitude += positions[i][1];
    }

    const avgLatitude = totalLatitude / positions.length;
    const avgLongitude = totalLongitude / positions.length;

    return [avgLatitude, avgLongitude];
  }

  return (
    <>
      <ParcelLocationEditDialog polygon={polygon} center={center} />
      <MapContainer
        className={classes.map}
        center={center}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <PolygonOverlay positions={positions} />
        <div className={"leaflet-top leaflet-right"}>
          <div className="leaflet-control">
            <Tooltip title={"Edit location"}>
              <IconButton
                onClick={() =>
                  dispatch(
                    toggleDialogIsOpened(
                      DialogContentType.PARCEL_LOCATION_EDIT,
                    ),
                  )
                }
                sx={{
                  background: theme.palette.background.default,
                }}
                color="primary"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </MapContainer>
    </>
  );
};
