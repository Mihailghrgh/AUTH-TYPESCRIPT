import axios from "axios";

const options = {
  baseUrl: process.env.API_URL,
  withoutCredentials: true,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response;

    return Promise.reject({ status, ...data });
  }
);

export default API;
