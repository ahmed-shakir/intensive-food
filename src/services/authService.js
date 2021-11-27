import jwtDecode from 'jwt-decode';
import http from "../services/httpService";
import storageService from "./storageService";
import { apiBaseUrl, tokenKey } from "../config.json";

const apiEndpoint = apiBaseUrl + "/auth";

http.setAuthHeader(getJwt());

async function login(user) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
  });
  storageService.saveData(tokenKey, jwt);
}

function loginWithJwt(jwt) {
  storageService.saveData(tokenKey, jwt);
}

function logout() {
  storageService.removeData(tokenKey);
}

function getCurrentUser() {
    try {
        const token = storageService.getData(tokenKey);
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
}

function getJwt() {
  return storageService.getData(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
