import { Address } from "../model/entities/Address";
import User from "../model/entities/User";
import axiosInstance from "./axioInstance";
import { AuthenticationTokens } from "../model/entities/AuthenticationTokens";
import { logout, setToken } from "../utils/auth";

interface SignUpRequestBody extends LoginRequestBody {
  name: string;
  surname: string;
  birthDate: Date;
  farmName: string;
  address: Address;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

export const sendLoginRequest = (body: LoginRequestBody) => {
  return axiosInstance.post<AuthenticationTokens>("auth/login", body);
};

export const sendLogoutRequest = () => {
  return axiosInstance.post<void>("auth/logout");
};

export const sendRefreshTokenRequest = (body: AuthenticationTokens) => {
  return axiosInstance.post<AuthenticationTokens>("auth/refreshToken", body);
};

export const sendSignUpRequest = (body: SignUpRequestBody) => {
  return axiosInstance.post<User>("auth/signUp", body);
};
