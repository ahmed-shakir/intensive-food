import http from "../services/httpService";
import { apiBaseUrl } from "../config.json";

const apiEndpoint = apiBaseUrl + "/users";

function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

export default {
  register
}
