import React from "react";
import { Navigate, useRouteLoaderData } from "react-router";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useRouteLoaderData("root");

  if (!!token) {
    return <>{children}</>;
  }

  return <Navigate to={"/auth/login"} replace />;
};
