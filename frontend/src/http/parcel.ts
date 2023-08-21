import {Parcel} from "../model/entities/Parcel";
import axios from "axios";
import {config} from "../config";
import {getToken} from "../utils/auth";

export const getParcels = () => {
    return axios.get<Parcel[]>(config.api + "parcel/all", {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });
}
