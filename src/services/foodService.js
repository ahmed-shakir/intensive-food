import http from "../services/httpService";
import { apiBaseUrl } from "../config.json";

const apiEndpoint = apiBaseUrl + "/foods";

function foodUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getFoods() {
  return http.get(apiEndpoint);
}

export function getFood(id) {
  return http.get(foodUrl(id));
}

export function saveFood(food) {
  if (food._id) {
    const body = { ...food };
    delete body._id;
    return http.put(foodUrl(food._id), body);
  }
  return http.post(apiEndpoint, food);
}

export function deleteFood(id) {
  return http.delete(foodUrl(id));
}
