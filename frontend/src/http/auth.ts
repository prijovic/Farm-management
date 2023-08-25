import {Address} from "../model/entities/Address";
import User from "../model/entities/User";
import axiosInstance from "./axioInstance";

interface SignUpRequestBody extends LoginRequestBody {
    name: string,
    surname: string,
    birthDate: Date,
    farmName: string,
    address: Address
}

interface LoginRequestBody {
    email: string,
    password: string,
}

export const sendLoginRequest = (body: LoginRequestBody) => {
    return axiosInstance.post<string>("auth/login", body);
};

export const sendSignUpRequest = (body: SignUpRequestBody) => {
    return axiosInstance.post<User>("auth/signUp", body);
};
