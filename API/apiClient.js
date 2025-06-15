import axios from "axios";
import { redirect } from "next/navigation";

const options = {
  baseURL: process.env.API_URL,
  withoutCredentials: true,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response;

    if (status === 401 && data?.errorCode === "InvalidAccessToken") {
      try {
        API.get("/auth/refresh");
      } catch (error) {
        redirect("/");
      }
    }

    return Promise.reject({ status, ...data });
  }
);

export default API;
