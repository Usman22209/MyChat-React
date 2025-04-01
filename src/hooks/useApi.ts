import { useState } from "react";
import toast from "react-hot-toast";

export const useApi = (
  apiFunction: (...args: any[]) => Promise<any>,
  shouldShowSuccessToast: boolean = true,
  shouldShowErrorToast: boolean = true
) => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const showSuccessToast = (message: string) => {
    toast.success(message);
  };

  const showErrorToast = (message: string) => {
    toast.error(message);
  };

  const requestCall = async (...args: any[]) => {
    try {
      setLoading(true);
      const res = await apiFunction(...args);
      setResponse(res?.data);
      setLoading(false);
      if (shouldShowSuccessToast) {
        if (res.data.status === 200 || res.data.status === 201) {
          showSuccessToast(res?.data?.message || "Success");
        } else {
          showErrorToast(res?.data?.message);
        }
      }
      return res;
    } catch (err: any) {
      setLoading(false);
      setError(err);
      if (shouldShowErrorToast) {
        const errorMsg = err?.response?.data?.message || "An error occurred";
        showErrorToast(errorMsg);
        console.error("Error:", err?.response?.data);
      }
      throw err;
    }
  };

  return { loading, error, response, requestCall };
};
