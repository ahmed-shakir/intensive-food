import http from "../services/httpService";
import { apiBaseUrl } from "../config.json";

const apiEndpoint = apiBaseUrl + "/categories";

function categoryUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCategories() {
  return http.get(apiEndpoint);
}

export function getCategory(id) {
  return http.get(categoryUrl(id));
}
