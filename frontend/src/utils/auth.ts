import jwtDecode from "jwt-decode";
import {JWT} from "../model/entities/JWT";

const storageTokenKey = "token";
let tokenExpirationTimer: NodeJS.Timeout | null = null;

export const setToken = (token: string) => {
    localStorage.setItem(storageTokenKey, token);
    const decodedJWT = jwtDecode<JWT>(token);
    const expirationDate = new Date(decodedJWT.exp * 1000);

    tokenExpirationTimer = setTimeout(() => {
        logout()
    }, expirationDate.getTime() - new Date().getTime());
}

export const getToken = (): string | null => {
    return localStorage.getItem(storageTokenKey);
}

const getDecodedToken = (): JWT | null => {
    const token = getToken();
    if (token) {
        return jwtDecode<JWT>(token);
    }
    return null;
}

export const getUserId = (): string | null => {
    const decodedToken = getDecodedToken();
    if (decodedToken) {
        return decodedToken.UserId
    }
    return null;
}

export const logout = () => {
    if (tokenExpirationTimer) {
        clearTimeout(tokenExpirationTimer);
        tokenExpirationTimer = null;
    }
    localStorage.removeItem(storageTokenKey);
}
