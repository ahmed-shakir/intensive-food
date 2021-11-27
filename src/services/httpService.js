import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
import { tokenHeaderKey, errorMessage } from "../config.json";

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    logger.error(error);
    toast.error("An unexpected error occurred");
  }
  if (error.response.status === 401 || error.response.status === 403) {
    toast.error(errorMessage[error.response.status.toString()]);
  }
  if (error.response.status === 404) {
    toast.error(error.response.data);
  }

  return Promise.reject(error);
});

function setAuthHeader(jwt) {
  axios.defaults.headers.common[tokenHeaderKey] = jwt;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setAuthHeader
};

export default http;
