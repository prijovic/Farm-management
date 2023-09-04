import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { ErrorPage } from "../pages/ErrorPage";
import { HomePage } from "../pages/HomePage";
import { AuthPage } from "../pages/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { ParcelsPage } from "../pages/ParcelsPage";
import { ParcelEditPage } from "../pages/ParcelEditPage";
import { ParcelDetailsPage } from "../pages/ParcelDetailsPage";
import React from "react";
import { getToken, tokenLoader } from "../utils/auth";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      loader={tokenLoader}
      shouldRevalidate={({ currentUrl, nextUrl }) =>
        currentUrl.pathname !== nextUrl.pathname &&
        (nextUrl.pathname === "/auth/login" || nextUrl.pathname === "/")
      }
      id="root"
      element={<RootLayout />}
      errorElement={<ErrorPage />}
    >
      <Route index={true} element={<HomePage />} />
      <Route path="auth/:mode" element={<AuthPage />} />
      <Route
        path="parcel/all"
        element={
          <ProtectedRoute>
            <ParcelsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="parcel/new"
        element={
          <ProtectedRoute>
            <ParcelEditPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="parcel/:id"
        element={
          <ProtectedRoute>
            <ParcelDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="parcel/:id/edit"
        element={
          <ProtectedRoute>
            <ParcelEditPage />
          </ProtectedRoute>
        }
      />
    </Route>,
  ),
);
