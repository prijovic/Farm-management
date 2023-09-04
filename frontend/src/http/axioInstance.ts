import axios from "axios";
import { getRefreshToken, getToken, logout, setToken } from "../utils/auth";
import { config } from "../config";
import { sendRefreshTokenRequest } from "./auth";

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
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    if (originalConfig.url !== "/auth/login" && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          await sendRefreshTokenRequest({
            token: getToken()!,
            refreshToken: getRefreshToken()!,
          }).then((response) => {
            setToken(response.data);
            originalConfig.headers.Authorization =
              "Bearer " + response.data.token;
          });

          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      } else if (error.response.status === 498 && error.response) {
        logout();
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
