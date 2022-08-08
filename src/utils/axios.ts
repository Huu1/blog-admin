import axios from "axios";
import { customHistory } from "./history";

export const TOKEN = "token";

// create an axios instance
const http = axios.create({
  withCredentials: false,
  timeout: 5000,
});

// request interceptor
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers = {
        ...config.headers,
        token: `${token}`,
      };
    }
    return config;
  },
  (error) => {
    // do something with request error
    // console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
http.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    return response.data;
  },
  (error) => {
    if ([401, 403].includes(error.response.status)) {
      customHistory.replace("/login", { from: customHistory.location });
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default http;
