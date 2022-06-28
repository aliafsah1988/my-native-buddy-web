import axios from "axios";
import { TokenService } from "../services/storage.service";
import config from "../config";

const ApiService = {
  _401interceptor: null,

  init() {
    axios.defaults.baseURL = config.BASE_URL;
    this.mount401Interceptor();
  },

  setHeader() {
    axios.defaults.headers.common["x-access-token"] = TokenService.getToken();
    axios.defaults.headers.common["Content-Type"] = "application/json";
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  get(resource) {
    return axios.get(resource);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data);
  },

  mount401Interceptor() {
    this._401interceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.request.status === 401) {
          // refresh token or logout
          TokenService.removeToken();
        }

        // If error was not 401 just reject as is
        throw error;
      }
    );
  },

  unmount401Interceptor() {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor);
  },
};

export default ApiService;
