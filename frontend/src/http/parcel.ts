import {Parcel} from "../model/entities/Parcel";
import axios from "axios";
import {config} from "../config";
import {getToken} from "../utils/auth";
import {ParcelOperation} from "../model/entities/ParcelOperation";

interface ParcelEditRequest {
    name: string;
    size: number;
    number: number;
}

interface ParcelOperationEditRequest {
    name: string;
    description: string;
    status?: number;
}

export const getParcels = () => {
    return axios.get<Parcel[]>(config.api + "parcel/all", {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });
}

export const getParcelOperations = (id: string) => {
    return axios.get<ParcelOperation[]>(config.api + "parcel/" + id + "/operations", {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });
}

export const sendCreateParcelRequest = (body: ParcelEditRequest) => {
    return axios.post<Parcel>(config.api + "parcel", body, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });
}

export const sendCreateParcelOperationRequest = (id: string, body: ParcelOperationEditRequest) => {
    return axios.post<ParcelOperation>(config.api + "parcel/" + id + "/operations", body, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });
}

export const sendUpdateParcelRequest = (id: string, body: ParcelEditRequest) => {
    return axios.put<Parcel>(config.api + "parcel/" + id, body, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });
}

export const sendUpdateParcelOperationRequest = (id: string, body: ParcelOperationEditRequest) => {
    return axios.put<ParcelOperation>(config.api + "parcel/operations/" + id, body, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });
}

export const sendDeleteParcelRequest = (id: string) => {
    return axios.delete<string>(config.api + "parcel/" + id, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });
}
