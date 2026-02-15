import { URL_ABOUT, URL_TRAINEE_UPDATE_PROFILE } from "@/constants/urls";
import { api } from "@/utils/api";
import { sprintf } from "sprintf";

export const aboutService = {
  getList: async () => {
    const url = sprintf(URL_ABOUT);

    return api.get(url).then((res) => {
      return res?.data?.data;
    });
  },
  updateProfile: async (payload) => {
    const url = sprintf(URL_TRAINEE_UPDATE_PROFILE, { params: "" });

    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    return api
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: [(data) => data], // 🔥 WAJIB supaya tidak jadi JSON
      })
      .then((res) => res?.data?.data);
  },
};
