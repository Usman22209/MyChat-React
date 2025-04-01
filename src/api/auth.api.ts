import { API_CONFIG } from "../../config";
import axiosHelper from "@helper/axios.helper";
export const AUTH_API = {
  login: async (payload: any) => {
    const url = `${API_CONFIG.AUTH.login}`;
    return axiosHelper.post(url, payload);
  },
  signup: async (payload: any) => {
    const url = `${API_CONFIG.AUTH.signup}`;
    return axiosHelper.post(url, payload);
  },
};
