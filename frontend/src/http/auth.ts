import {Address} from "../model/entities/Address";
import axios from "axios";
import {config} from "../config";
import User from "../model/entities/User";

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

export const sendLoginRequest = () => {
};

export const sendSignUpRequest = (body: SignUpRequestBody) => {
    return axios.post<User>(config.api + "auth/signUp", body);
};
