import React, { useMemo, useRef, useState } from "react";
import { Marker } from "react-leaflet";
import { Icon, LatLngTuple } from "leaflet";
import { config } from "../../../../../../../config";
import { useTheme } from "@mui/material";

export class MarkerFactory {
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

export const DraggableMarker: React.FC<{
  index: number;
  center: LatLngTuple;
  onDrag: (index: number, position: LatLngTuple) => void;
  onDelete: (index: number) => void;
}> = ({ center, onDrag, index, onDelete }) => {
  const theme = useTheme();
  const [position, setPosition] = useState(center);
  const markerRef = useRef<any>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
      move() {
        const marker = markerRef.current;
        if (marker != null) {
          onDrag(index, marker.getLatLng());
        }
      },
      dblclick() {
        onDelete(index);
      },
    }),
    [onDrag, index, onDelete],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={
        new Icon({
          iconUrl: `https://api.geoapify.com/v1/icon?size=xx-large&type=material&color=%23${theme.palette.primary[
            theme.palette.mode
          ].slice(1)}&apiKey=${config.geoApiKey}`,
          iconSize: [31, 46], // size of the icon
          iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -45],
        })
      }
    ></Marker>
  );
};
