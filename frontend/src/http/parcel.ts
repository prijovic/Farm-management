import {Parcel} from "../model/entities/Parcel";
import axios from "axios";
import {config} from "../config";
import {getToken} from "../utils/auth";

interface ParcelEditRequest {
    name: string;
    size: number;
    number: number;
}

export const getParcels = () => {
    return axios.get<Parcel[]>(config.api + "parcel/all", {
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
    })
}

export const sendUpdateParcelRequest = (id: string, body: ParcelEditRequest) => {
    return axios.put<Parcel>(config.api + "parcel/" + id, body, {
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
