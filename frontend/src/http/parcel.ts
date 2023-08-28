import { Parcel } from "../model/entities/Parcel";
import { ParcelOperation } from "../model/entities/ParcelOperation";
import axiosInstance from "./axioInstance";
import { Location } from "../model/entities/Location";

interface ParcelEditRequest {
  name: string;
  size: number;
  number: number;
}

interface ParcelOperationEditRequest {
  name: string;
  description: string;
}

interface ParcelOperationPositionEditRequest {
  status: number;
  index: number;
}

export const getParcels = () => {
  return axiosInstance.get<Parcel[]>("parcel/all");
};

export const getParcelOperations = (id: string) => {
  return axiosInstance.get<ParcelOperation[]>("parcel/" + id + "/operations");
};

export const sendCreateParcelRequest = (body: ParcelEditRequest) => {
  return axiosInstance.post<Parcel>("parcel", body);
};

export const sendCreateParcelOperationRequest = (
  id: string,
  body: ParcelOperationEditRequest,
) => {
  return axiosInstance.post<ParcelOperation>(
    "parcel/" + id + "/operations",
    body,
  );
};

export const sendUpdateParcelRequest = (
  id: string,
  body: ParcelEditRequest,
) => {
  return axiosInstance.put<Parcel>("parcel/" + id, body);
};

export const sendUpdateParcelPolygonRequest = (
  id: string,
  body: { polygon: Location[] },
) => {
  return axiosInstance.put<Parcel>("parcel/" + id + "/polygon", body);
};

export const sendUpdateParcelOperationRequest = (
  id: string,
  body: ParcelOperationEditRequest,
) => {
  return axiosInstance.put<ParcelOperation>("parcel/operations/" + id, body);
};

export const sendUpdateParcelOperationPositionRequest = (
  id: string,
  body: ParcelOperationPositionEditRequest,
) => {
  return axiosInstance.put<ParcelOperation[]>(
    "parcel/operations/" + id + "/position",
    body,
  );
};

export const sendDeleteParcelRequest = (id: string) => {
  return axiosInstance.delete<string>("parcel/" + id);
};

export const sendDeleteParcelOperationRequest = (id: string) => {
  return axiosInstance.delete<string>("parcel/operations/" + id);
};
