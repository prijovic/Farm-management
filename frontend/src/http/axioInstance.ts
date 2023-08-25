import axios from 'axios'
import {getToken} from "../utils/auth";
import {config} from "../config";

const axiosInstance = axios.create({
    baseURL: config.api,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            if (config.headers) config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
