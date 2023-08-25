import React from "react";
import { LatLngTuple } from "leaflet";
import { Polygon, Polyline } from "react-leaflet";
import { useTheme } from "@mui/material";

export const PolygonOverlay: React.FC<{ positions: LatLngTuple[] }> = ({
  positions,
}) => {
  const theme = useTheme();
  const color = { color: theme.palette.secondary[theme.palette.mode] };

  if (positions.length < 2) {
    return null;
  }
  if (positions.length < 3) {
    return <Polyline positions={positions} pathOptions={color} />;
  }
  return <Polygon pathOptions={color} positions={positions} />;
};
