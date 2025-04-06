import { API_CONFIG } from "../../config";
import axiosHelper from "@helper/axios.helper";
export const USER_API = {
  getOtherUser: async (uid: string) => {
    const url = `${API_CONFIG.USER.getOtherUser(uid)}`;
    return axiosHelper.get(url);
  },
};
