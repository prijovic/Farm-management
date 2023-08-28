import React, { useEffect, useState } from "react";
import { ParcelsContainer } from "../components/ParcelsContainer/ParcelsContainer";
import { getParcels } from "../http/parcel";
import { NotificationType, showNotification } from "../store/features/uiSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectParcels, setParcels } from "../store/features/parcelSlice";
import { getErrorMessage } from "../utils/getErrorMessage";
import { logout } from "../store/features/authSlice";
import { Parcel } from "../model/entities/Parcel";

export const ParcelsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const parcels = useAppSelector(selectParcels);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchParcels() {
      await getParcels()
        .then((response) => {
          const parcels = response.data.map((p) => {
            Parcel.sortPolygon(p.polygon);
            return p;
          });
          dispatch(setParcels(parcels));
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

    fetchParcels().then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {isLoading && <p>Loading...</p>}
      </div>
      <ParcelsContainer parcels={parcels} />
    </>
  );
};
