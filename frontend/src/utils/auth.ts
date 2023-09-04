import jwtDecode from "jwt-decode";
import { JWT } from "../model/entities/JWT";
import { AuthenticationTokens } from "../model/entities/AuthenticationTokens";

const storageTokenKey = "token";
const storageRefreshTokenKey = "refreshToken";

export enum AuthMode {
  LOGIN = "login",
  SIGN_UP = "sign up",
}

export const setToken = (authenticationResponse: AuthenticationTokens) => {
  localStorage.setItem(storageTokenKey, authenticationResponse.token);
  localStorage.setItem(
    storageRefreshTokenKey,
    authenticationResponse.refreshToken,
  );
};

export const getToken = (): string | null => {
  return localStorage.getItem(storageTokenKey);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(storageRefreshTokenKey);
};

const getDecodedToken = (): JWT | null => {
  const token = getToken();
  if (token) {
    return jwtDecode<JWT>(token);
  }
  return null;
};

export const getUserId = (): string | null => {
  const decodedToken = getDecodedToken();
  if (decodedToken) {
    return decodedToken.UserId;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(storageTokenKey);
  localStorage.removeItem(storageRefreshTokenKey);
};

export function tokenLoader() {
  return getToken();
}
