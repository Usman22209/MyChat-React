import { API_CONFIG } from "./../../config";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { store } from "@redux/store";
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noAuth?: boolean;
}

const axiosHelper = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosHelper.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    try {
      const state = store.getState();
      const token = state.authPersist?.token;

      if (token && !config.noAuth) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosHelper.interceptors.response.use(
  (response) => {
    console.log(
      `%cSuccess: ${response?.config?.url}`,
      "color: green; background-color:rgb(225, 255, 230); font-weight: bold; padding: 8px;",
      response?.data
    );

    return response?.data;
  },
  async (error) => {
    const errorResponse = {
      status: error?.response?.status,
      data: error?.response?.data,
    };

    console.log(
      `%cError: ${error?.config?.url}`,
      "color: red; background-color:rgb(255, 225, 225); font-weight: bold; padding: 8px;",
      errorResponse
    );

    return Promise.reject(errorResponse);
  }
);

export default axiosHelper;
