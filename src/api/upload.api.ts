import { API_CONFIG } from "../../config";
import axiosHelper from "@helper/axios.helper";
export const UPLOAD_API = {
  uploadFile: async (body: FormData) => {
    const url = `${API_CONFIG.UPLOAD.upload}`;
    console.log(url,body);
    
    return axiosHelper.post(url, body);
  },
};
