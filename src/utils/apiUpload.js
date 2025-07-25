// apiUpload.js
import axios from "axios";
import envs from "@/constants/envs";
import { getCookie, deleteCookie } from "cookies-next";
import { storageKeys } from "@/constants/storage-keys";
import handleError from "./handleError";

// API khusus upload: tanpa timeout, pakai FormData, bisa progress
export const apiUpload = axios.create({
  baseURL: envs.API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 0, // no timeout
});

// Gunakan interceptor yang sama seperti `api`
apiUpload.interceptors.request.use(async (config) => {
  const token = getCookie(storageKeys.AUTH_TOKEN);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiUpload.interceptors.response.use(
  function (response) {
    if (response.data?.error?.status) {
      if (response.data?.error?.code === 401) {
        deleteCookie(storageKeys.AUTH_TOKEN);
        deleteCookie(storageKeys.ROLE);
        window.location.reload();
      }
      return Promise.reject({ message: response.data?.error?.msg });
    }
    return response;
  },
  function (error) {
    return Promise.reject(handleError(error));
  },
);
